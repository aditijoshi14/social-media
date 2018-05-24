import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    getUserInformation(userId ?: string) {
        const userID = _.isUndefined(userId)? this.authInfoService.info.userId: userId;
        this.httpClient.get(`${Constants.BASE_URL}/members_info?userId=${userID}`).subscribe(
            (data: any) => {
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
                

                if(_.isUndefined(userId)){
                    this.authInfoService.info.follower = followers;
                    this.authInfoService.info.following = following;
                }
            }
        )
    }

    clear() {
        this.userFullInfo = {};
    }

    checkIfFollowing(followingUserId): void {
        let following = this.authInfoService.info.following;
        if (_.some(following, { "userId": `${followingUserId}`})) {
            this.followingStatus = "Following"
        } else {
            this.followingStatus = "Follow"
        }
    }

    follow(userId, followingUserId){
       
    }
}