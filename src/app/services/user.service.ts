import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constant';
import { Follow } from '../app.interface';

@Injectable()
export class UserService{
    userFullInfo: any;

    constructor(private httpClient: HttpClient){
        this.userFullInfo = {};
    }

    getUserInformation(userId){
        this.httpClient.get(`${Constants.BASE_URL}/members_info?userId=${userId}`).subscribe(
            (data:any) => {
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
            }
        )
    }
}