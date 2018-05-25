import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../app.constant';
import { Follow } from '../app.interface';
import { AuthInfoService } from './authInfo.service';
import * as _ from 'lodash';

@Injectable()
export class UserService {
    userFullInfo: any;
    completed: boolean;
    followingStatus: string;

    constructor(private httpClient: HttpClient,
        private authInfoService: AuthInfoService) {
        this.userFullInfo = {};
        this.completed = false;
    }

    getUserInformation(userId?: string) {
        const userID = _.isUndefined(userId) ? this.authInfoService.info.userId : userId;
        this.httpClient.get(`${Constants.BASE_URL}/members_info?userId=${userID}`).subscribe(
            (data: any) => {
                this.userFullInfo.id = data[0].id;
                this.userFullInfo.fullName = data[0].fullName;
                this.userFullInfo.username = data[0].username;
                this.userFullInfo.userId = data[0].userId;

                let followers = [];
                followers = data[0].follower;
                this.userFullInfo.followers = followers;
                this.userFullInfo.followersLength = followers.length;

                let following = [];
                following = data[0].following;
                this.userFullInfo.following = following;
                this.userFullInfo.followingLength = following.length;


                if (_.isUndefined(userId)) {
                    this.authInfoService.info.follower = followers;
                    this.authInfoService.info.following = following;
                }
            }
        )
    }

    clear() {
        this.userFullInfo = {};
    }

    checkIfFollowing(followingUserId): boolean {
        let following = this.authInfoService.info.following;
        if (_.some(following, { "userId": `${followingUserId}` })) {
            this.followingStatus = "Following"
            return true;
        } else {
            this.followingStatus = "Follow"
            return false;
        }
    }

    followOrUnfollow(followingUserId, fullName) {
        if (this.checkIfFollowing(followingUserId)) {
            this.unfollow(followingUserId);
        } else {
            this.follow(followingUserId);
        }
    }

    follow(followingUserId) {
        // Implemented this way because of the restriction in JSON server. 
        if (followingUserId == this.userFullInfo.userId) {
            let userData: any = this.authInfoService.info;
            let header: HttpHeaders = new HttpHeaders();
            let options = { headers: header.set('Content-Type', 'application/json') };

            userData.following.push({ "fullName": this.userFullInfo.fullName, "userId": this.userFullInfo.userId })
            this.httpClient.patch(`${Constants.BASE_URL}/members_info/${userData.id}`, { "following": userData.following }, options).subscribe(
                data => { },
                err => {
                    this.followingStatus = "Follow"
                }
            )
            this.userFullInfo.followers.push({ "fullName": userData.fullName, "userId": userData.userId })
            this.httpClient.patch(`${Constants.BASE_URL}/members_info/${this.userFullInfo.id}`, { "follower": this.userFullInfo.followers }, options).subscribe(
                data => {
                    this.followingStatus = "Following"
                },
                err => {
                    this.followingStatus = "Follow"
                }
            )
        }
    }

    unfollow(followingUserId) {
        // Implemented this way because of the restriction in JSON server. 
        if (followingUserId == this.userFullInfo.userId) {
            let userData: any = this.authInfoService.info;
            let header: HttpHeaders = new HttpHeaders();
            let options = { headers: header.set('Content-Type', 'application/json') };

            _.remove(userData.following, { "fullName": this.userFullInfo.fullName, "userId": this.userFullInfo.userId });
            this.httpClient.patch(`${Constants.BASE_URL}/members_info/${userData.id}`, { "following": userData.following }, options).subscribe(
                data => { },
                err => {
                    this.followingStatus = "Following"
                }
            )
            _.remove(this.userFullInfo.followers, { "fullName": userData.fullName, "userId": userData.userId })
            this.httpClient.patch(`${Constants.BASE_URL}/members_info/${this.userFullInfo.id}`, { "follower": this.userFullInfo.followers }, options).subscribe(
                data => {
                    this.followingStatus = "Follow"
                },
                err => {
                    this.followingStatus = "Following"
                }
            )
        }
    }
}