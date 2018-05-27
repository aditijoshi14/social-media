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
                followers = data[0].followers;
                this.userFullInfo.followers = followers;
                this.userFullInfo.followersLength = followers.length;

                let following = [];
                following = data[0].following;
                this.userFullInfo.following = following;
                this.userFullInfo.followingLength = following.length;


                if (_.isUndefined(userId)) {
                    this.authInfoService.info.followers = followers;
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

    follow(followingUserId, followingUserInfo?) {
        // Implemented this way because of the restriction in JSON server. 
        let userData: any = this.authInfoService.info;
        let followingUserData: any = this.userFullInfo.userId == followingUserId ? this.userFullInfo : followingUserInfo;
        let header: HttpHeaders = new HttpHeaders();
        let options = { headers: header.set('Content-Type', 'application/json') };

        userData.following.push({ "fullName": followingUserData.fullName, "userId": followingUserData.userId, "id": followingUserData.id })
        this.httpClient.patch(`${Constants.BASE_URL}/members_info/${userData.id}`, { "following": userData.following }, options).subscribe(
            data => { },
            err => {
            }
        )

        followingUserData.followers.push({ "fullName": userData.fullName, "userId": userData.userId, "id": userData.id })
        this.httpClient.patch(`${Constants.BASE_URL}/members_info/${followingUserData.id}`, { "followers": followingUserData.followers }, options).subscribe(
            data => {
                if (_.isUndefined(followingUserInfo)) {
                    this.followingStatus = "Following"
                    followingUserData.followersLength++;
                }
                userData.followingLength++;
            },
            err => {
                _.remove(followingUserData.followers, { "fullName": userData.fullName, "userId": userData.userId, "id": userData.id });
                _.remove(userData.following, { "fullName": followingUserData.fullName, "userId": followingUserData.userId, "id": followingUserData.id });
            }
        )

    }

    unfollow(followingUserId, followingUserInfo?) {
        // Implemented this way because of the restriction in JSON server. 
        let userData: any = this.authInfoService.info;
        let followingUserData: any = this.userFullInfo.userId == followingUserId ? this.userFullInfo : followingUserInfo;

        let header: HttpHeaders = new HttpHeaders();
        let options = { headers: header.set('Content-Type', 'application/json') };

        _.remove(userData.following, { "fullName": followingUserData.fullName, "userId": followingUserData.userId, "id": followingUserData.id });
        this.httpClient.patch(`${Constants.BASE_URL}/members_info/${userData.id}`, { "following": userData.following }, options).subscribe(
            data => { },
            err => { }
        )

        _.remove(followingUserData.followers, { "fullName": userData.fullName, "userId": userData.userId, "id": userData.id })
        this.httpClient.patch(`${Constants.BASE_URL}/members_info/${followingUserData.id}`, { "followers": followingUserData.followers }, options).subscribe(
            data => {
                if (_.isUndefined(followingUserInfo)) {
                    this.followingStatus = "Follow"
                    followingUserData.followersLength--;
                }
                userData.followingLength--;
            },
            err => {
                userData.following.push({ "fullName": followingUserData.fullName, "userId": followingUserData.userId, "id": followingUserData.id });
                followingUserData.followers.push({ "fullName": userData.fullName, "userId": userData.userId, "id": userData.id });
            }
        )
    }
}