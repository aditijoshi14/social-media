import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constant'
import { LocalStorageService } from 'angular-2-local-storage';
import { StateService } from './state.service';

@Injectable()

export class PostService {
    private info: any;
    private postInput: string;
    private inputCharacters: number;
    constructor(private httpClient: HttpClient,
        private storage: LocalStorageService,
        private stateService: StateService) {
        this.info = this.storage.get('userInfo');
        this.postInput = "";
        this.inputCharacters = 300;
    }

    loadFeedPosts() {
        this.httpClient.get(`${Constants.BASE_URL}/posts?postContributerId=${this.info.id}${this.info.username}`).
            subscribe(
                data => {

                },
                err => { }
            );
    }

    post(content): void {
        var post: any = {};
        post.postContributerId = `${this.info.id}${this.info.username}`;
        post.postContent = content;
        post.numVotes = 0;
        post.fullName = this.info.fullName;

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
}