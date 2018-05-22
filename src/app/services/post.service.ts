import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constant'
import { LocalStorageService } from 'angular-2-local-storage';
import { StateService } from './state.service';
import { Post } from '../app.interface';
import { MomentModule } from 'ngx-moment';

@Injectable()

export class PostService {
    private info: any;
    private postInput: string;
    private inputCharacters: number;
    private profilePosts: Array<Post>;
    private profilePostLength: number;
    private feedPosts: Array<Post>;
    private currentDate: Date;
    private followingList: String;

    constructor(private httpClient: HttpClient,
        private storage: LocalStorageService,
        private stateService: StateService) {
        this.info = this.storage.get('userInfo');
        this.postInput = "";
        this.inputCharacters = 300;
        this.currentDate = new Date();
        this.followingList = new String("");
    }

    loadFeedFollowing() {
        this.httpClient.get(`${Constants.BASE_URL}/members_info?username=${this.info.username}`).
            subscribe(
                (data: any) => {
                    for (let userId of data[0].following){
                        this.followingList = `${this.followingList}&postContributerId=${userId}`;
                    }
                    this.loadFeedPosts();
                }, err => { }
            )
    }
    loadFeedPosts() {
        console.log(`${Constants.BASE_URL}/posts?postContributerId=${this.info.id}${this.info.username}${this.followingList}`);
        this.httpClient.get(`${Constants.BASE_URL}/posts?postContributerId=${this.info.id}${this.info.username}${this.followingList}`).
            subscribe(
                (data: any) => {
                    this.feedPosts = data;
                    this.feedPosts.reverse();
                },
                err => { }
            );
    }

    post(content): void {
        var post: any = {};
        post.postContributerId = `${this.info.id}${this.info.username}`;
        post.postContent = content;
        post.numVotes = 0;
        post.postContributerFullName = this.info.fullName;
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

    getProfilePost() {
        this.httpClient.get(`${Constants.BASE_URL}/posts?postContributerId=${this.info.id}${this.info.username}`).subscribe(
            (data: any) => {
                this.profilePosts = data;
                this.profilePosts.reverse();
                this.profilePostLength = data.length;
            },
            err => { }
        )
    }
}