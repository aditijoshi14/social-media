import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constant';
import { StateService } from './state.service';
import { Post } from '../app.interface';
import { MomentModule } from 'ngx-moment';
import { AuthInfoService } from './authInfo.service';
import * as _ from 'lodash';

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
        for (let user of this.authInfoService.info.following) {
            this.followingList = `${this.followingList}&postContributerId=${user.userId}`;
        }
        this.loadFeedPosts();
    }

    loadFeedPosts() {
        this.httpClient.get(`${Constants.BASE_URL}/posts?postContributerId=${this.authInfoService.info.userId}${this.followingList}`).
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
        post.postContributerId = this.authInfoService.info.userId;
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

    checkIfVoted(data): number {
        var id = this.authInfoService.info.userId;
        if (_.includes(data.upVoteId, id)) {
            return 0;
        } else if (_.includes(data.downVoteId, id)) {
            return 1;
        } else {
            return 2;
        }
    }

    upVote(post) {
        var postId = post.id;
        this.httpClient.get(`${Constants.BASE_URL}/posts?id=${postId}`).subscribe(
            (data: any) => {
                var ifVoted = this.checkIfVoted(data[0])
                if (ifVoted == 0) {
                    _.pull(data[0].upVoteId, this.authInfoService.info.userId);
                    this.changedArray(postId, {
                        "upVoteId": data[0].upVoteId,
                        "numVotes": data[0].numVotes - 1
                    }, data[0].numVotes - 1, post);
                    post.up = false;
                } else if (ifVoted == 1) {
                    data[0].upVoteId.push(this.authInfoService.info.userId);
                    _.pull(data[0].downVoteId, this.authInfoService.info.userId);
                    this.changedArray(postId, {
                        "upVoteId": data[0].upVoteId,
                        "downVoteId": data[0].downVoteId,
                        "numVotes": data[0].numVotes + 2
                    }, data[0].numVotes + 2, post);
                    post.up = true;
                    post.down = false;
                } else {
                    data[0].upVoteId.push(this.authInfoService.info.userId);
                    this.changedArray(postId, {
                        "upVoteId": data[0].upVoteId,
                        "numVotes": data[0].numVotes + 1
                    }, data[0].numVotes + 1, post);
                    post.up = true;
                }
            },
            err => { }
        );
    }

    downVote(post) {
        var postId = post.id;
        this.httpClient.get(`${Constants.BASE_URL}/posts?id=${postId}`).subscribe(
            (data: any) => {
                var ifVoted = this.checkIfVoted(data[0])
                if (ifVoted == 0) {
                    data[0].downVoteId.push(this.authInfoService.info.userId);
                    _.pull(data[0].upVoteId, this.authInfoService.info.userId);
                    this.changedArray(postId, {
                        "upVoteId": data[0].upVoteId,
                        "downVoteId": data[0].downVoteId,
                        "numVotes": data[0].numVotes - 2
                    }, data[0].numVotes - 2, post);
                    post.up = false;
                    post.down = true;
                } else if (ifVoted == 1) {
                    _.pull(data[0].downVoteId, this.authInfoService.info.userId);
                    this.changedArray(postId, {
                        "downVoteId": data[0].downVoteId,
                        "numVotes": data[0].numVotes + 1
                    }, data[0].numVotes + 1, post);
                    post.down = false;
                } else {
                    data[0].downVoteId.push(this.authInfoService.info.userId);
                    this.changedArray(postId, {
                        "downVoteId": data[0].downVoteId,
                        "numVotes": data[0].numVotes - 1
                    }, data[0].numVotes - 1, post);
                    post.down = true;
                }
            },
            err => { }
        );
    }

    changedArray(postId, changed, postNum, post) {
        this.httpClient.patch(`${Constants.BASE_URL}/posts/${postId}`, changed).subscribe(
            (data: any) => {
                post.numVotes = postNum;
            }
        )
    }

    clear() {
        this.profilePosts = [];
        this.feedPosts = [];
        this.followingList = "";
    }
}