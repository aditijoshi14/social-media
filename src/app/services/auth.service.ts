import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constant'
import { StateService } from './state.service';
import { Subscriber } from 'rxjs';
import * as _ from 'lodash';
import { LocalStorageService } from 'angular-2-local-storage';
import { CookieService } from 'ngx-cookie';


@Injectable()
export class AuthService {
    errorMessage: string;
    hasError: boolean;
    isRememberEnabled: boolean;
    
    constructor(private httpClient: HttpClient,
        private stateService: StateService,
        private storage: LocalStorageService,
        private cookie: CookieService
    ) {
        this.hasError = false;
        this.isRememberEnabled = false;
    }

    hasErrorRegister(user): boolean {
        // Checking if inputs provided by user has error.
        if (_.isEmpty(user.fullName)) {
            this.errorMessage = "Please enter your full name";
        } else if (_.isEmpty(user.email)) {
            this.errorMessage = "Please enter your email address";
        } else if (_.isEmpty(user.username)) {
            this.errorMessage = "Please enter a username";
        } else if (user.username.length < 6) {
            this.errorMessage = "Your username must be at least 6 characters";
        } else if (_.isEmpty(user.password)) {
            this.errorMessage = "Please enter a password";
        } else if (user.password.length < 8) {
            this.errorMessage = "Your password must be at least 8 characters";
        } else {
            return false;
        }
        return true;
    }

    signUp(user): void {
        if (!this.hasErrorRegister(user)) {
            this.emailRegistered(user);
        }
    }

    emailRegistered(userInfo): void {
        // Check if the provided email address was already used to register
        // another account. If already taken, send error message. 
        // If not taken, continue the registration proccess.
        this.httpClient.get(`${Constants.BASE_URL}/members_info?email=${userInfo.email}`).subscribe(
            data => {
                if (_.isEmpty(data)) {
                    this.usernameRegistered(userInfo);
                } else {
                    this.hasError = true;
                    this.errorMessage = "Account is already created using this email."
                }
            },
            err => {
                this.hasError = true;
                this.errorMessage = ("Error Occured! Please try again later");
            }

        )
    }

    usernameRegistered(userInfo): void {
        // Check if the provided username has been taken to register
        // another account. If already taken, send error message. 
        // If not taken, continue the registration proccess.
        this.httpClient.get(`${Constants.BASE_URL}/members_info?username=${userInfo.username}`).subscribe(
            data => {
                if (_.isEmpty(data)) {
                    this.register(userInfo);
                } else {
                    this.hasError = true;
                    this.errorMessage = "This username has already been taken."

                }
            },
            err => {
                this.hasError = true;
                this.errorMessage = ("Error Occured! Please try again later");
            }

        )
    }

    register(user): void {
        // Complete the registration proccess by storing all the information 
        // in the server.
        this.httpClient.
            post(`${Constants.BASE_URL}/members_info`, user).
            subscribe(
                (data: any) => {
                    let userInfo:any = {};
                    // Store user information in the local storage 
                    userInfo.id = data.id
                    userInfo.username = data.username;
                    userInfo.fullName = data.fullName;
                    this.storage.set('userInfo', userInfo);
                    this.stateService.go("feed");
                    // Added userId in the server
                    data.userId = `${data.id}${data.username}`
                    this.httpClient.patch(`${Constants.BASE_URL}/members_info/${data.id}`, data).subscribe();
                },
                err => {
                    this.hasError = true;
                    this.errorMessage = ("Error Occured! Please try again later");

                }
            );
    }

    signIn(userInfo): void {
        this.httpClient.get(`${Constants.BASE_URL}/members_info?username=${userInfo.username}&password=${userInfo.password}`).
            subscribe(
                (data:any) => {
                    if (_.isEmpty(data)) {
                        this.errorMessage = ("Your username and password doesn't match.");
                    } else {
                        // Store user information in the local storage 
                        let userInfo:any = {};
                        userInfo.id = data[0].id
                        userInfo.username = data[0].username;
                        userInfo.fullName = data[0].fullName;
                        this.storage.set('userInfo', userInfo);

                        // Check if remember me is checked. If checked, store username 
                        // and password in cookie.
                        if(this.isRememberEnabled){
                            this.rememberMe(data[0]);
                        }else{
                            this.cookie.remove("credential");
                        }

                        this.stateService.go("feed");
                    }
                },
                err => {
                    this.errorMessage = ("Error Occured! Please try again later");
                }
            )
    }

    rememberMe(data):void{
        // Store username and password (Encoded in Base-64) in cookie.
        let credential:any = {};
        credential.username = data.username;
        credential.password = btoa(data.password);
        this.cookie.put('credential', JSON.stringify(credential));
        
    }
}