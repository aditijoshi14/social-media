import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constant';
import { AuthInfoService } from './authInfo.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()

export class NotificationService {
    notificationOpen: boolean;
    private notificationList: Array<Notification>;
    private userId: string;
    private noNotification: boolean;
    constructor(private httpClient: HttpClient,
        private storage: LocalStorageService) {
        this.notificationOpen = false;
        this.notificationList = [];
        this.noNotification = true;
    }

    getNotification() {
        let info:any = this.storage.get('userInfo');
        this.userId = `${info.id}${info.username}`;
        this.httpClient.get(`${Constants.BASE_URL}/notification?userId=${this.userId}&_sort=id&_order=desc`).subscribe(
            (data: any) => {
                this.notificationList = data;
                if(this.notificationList.length > 0){
                    this.noNotification = false;
                }
            }
        );
    }

    getNotificationContent(id): string{
        if(id == 1){
            return "started following you.";
        }else if(id == 2){
            return "upvoted your post.";
        }
        return "";
    }

    addNotification(notification){
        this.httpClient.post(`${Constants.BASE_URL}/notification`, notification).subscribe(
            data => {},
            err => {}
        );
    }

    clear(){
        this.notificationOpen = false;
        this.userId = "";
        this.notificationList = [];
        this.noNotification = true;
    }
}