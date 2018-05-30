import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { UserService } from './user.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import * as _ from 'lodash';
import { Constants } from '../app.constant';
import { HttpClient } from '@angular/common/http';
import { StateService } from './state.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { of } from 'rxjs';
import 'rxjs/add/observable/of';
import { NotificationService } from './notification.service';

@Injectable()
export class AuthInfoService implements CanActivate {
    info: any;
    constructor(private storage: LocalStorageService,
        private httpClient: HttpClient,
        private router: Router,
        private notificationService: NotificationService
    ) {
        this.info = {};
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (_.isEmpty(this.storage.get('userInfo'))) {
            this.router.navigate([""]);
            return false;
        } else {
            this.info = this.storage.get('userInfo');
            this.info.userId = `${this.info.id}${this.info.username}`
            this.setInfo();
            this.notificationService.getNotification();
            return this.getUserInformation();
        }
    }

    getUserInformation(): Observable<boolean> | boolean {
        let obs;
        try {
            obs = this.httpClient.get(`${Constants.BASE_URL}/members_info?userId=${this.info.userId}`)
                .pipe(map((result: any) => result));


        } catch (err) {
            obs = Observable.of(false);
        }

        return obs.pipe(map(data => {
                if (!_.isEmpty(data)) {
                    this.info.fullName = data[0].fullName;
                    let followers = [];
                    followers = data[0].followers;
                    this.info.followers = followers;
                    this.info.followersLength = followers.length;

                    let following = [];
                    following = data[0].following;
                    this.info.following = following;

                    this.info.followingLength = following.length;

                    return true;
                } else {
                    this.router.navigate([""]);
                    return false;
                }
            },
                err => {
                 }
            ));
    }

    setInfo() {
        this.info = this.storage.get('userInfo');
        this.info.userId = `${this.info.id}${this.info.username}`;

    }

    clear() {
        this.info = {};
    }
}