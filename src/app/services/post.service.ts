import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constant'
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()

export class PostService{
    constructor(private httpClient: HttpClient,
        private storage: LocalStorageService){
    }

    loadFeedPosts(){
        var info:any = this.storage.get('userInfo');
        this.httpClient.get(`${Constants.BASE_URL}/post?postContributerId=${info.id}${info.username}`).
        subscribe(
            data => {
               // console.log(info.fullName);

            },
            err => {}
        );
        
    }
}