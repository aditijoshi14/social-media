import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constant';
import { StateService } from './state.service';
import { Post } from '../app.interface';
import { MomentModule } from 'ngx-moment';
import { AuthInfoService } from './authInfo.service';

@Injectable()

export class PostService {
    private postInput: string;
    private inputCharacters: number;
    private profilePosts: Array<Post>;
    private profilePostLength: number;
    private feedPosts: Array<Post>;
    private currentDate: Date;
    private followingList: String;

    constructor(private httpClient: HttpClient,
        private stateService: StateService,
        private authInfoService: AuthInfoService) {
            this.postInput = "";
            this.inputCharacters = 300;
            this.currentDate = new Date();
            this.followingList = new String("");
    }

    loadFeedFollowing() {
        this.httpClient.get(`${Constants.BASE_URL}/members_info?username=${this.authInfoService.info.username}`).
            subscribe(
                (data: any) => {
                    for (let user of data[0].following){
                        this.followingList = `${this.followingList}&postContributerId=${user.userId}`;
                    }
                    this.loadFeedPosts();
                }, err => { }
            )
    }
    loadFeedPosts() {
        this.httpClient.get(`${Constants.BASE_URL}/posts?postContributerId=${this.authInfoService.info.id}${this.authInfoService.info.username}${this.followingList}`).
            subscribe(
                (data: any) => {
                    this.feedPosts = data;
                    this.feedPosts.reverse();
                },
                err => { }
            );
    }

    post(content): void {
       // this.getRequiredData();
        var post: any = {};
        post.postContributerId = `${this.authInfoService.info.id}${this.authInfoService.info.username}`;
        post.postContent = content;
        post.numVotes = 0;
        post.postContributerFullName = this.authInfoService.info.fullName;
        post.timePosted = new Date();

        this.httpClient.post(`${Constants.BASE_URL}/posts`, post).subscribe(
            data => {
                window.alert("Your post is successfully posted!");
                this.postInput = "";
                this.loadFeedPosts();
            }
            , err => {
                window.alert("Error");
            }
        )
    }

    postInputValid(): boolean {
        if (this.postInput.length > 0) {
            this.inputCharacters = 300 - this.postInput.length;
            return true;
        } else {
            return false;
        }
    }

    getProfilePost(userId) {
        this.httpClient.get(`${Constants.BASE_URL}/posts?postContributerId=${userId}`).subscribe(
            (data: any) => {
                this.profilePosts = data;
                this.profilePosts.reverse();
                this.profilePostLength = data.length;
            },
            err => { }
        )
    }

    clear(){
        this.profilePosts = [];
        this.feedPosts = [];
        this.followingList = "";
    }
}