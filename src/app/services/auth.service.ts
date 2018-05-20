import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constant'
import { StateService } from './state.service';
import { Subscriber } from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
    errorMessage: string;
    hasError: boolean;
    constructor(private httpClient: HttpClient,
        private stateService: StateService) {
            this.hasError = false;
    }

    hasErrorRegister(user): boolean {
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
        if(!this.hasErrorRegister(user)){
          this.emailRegistered(user);
        }
      }

    emailRegistered(userInfo): void{
        this.httpClient.get(`${Constants.BASE_URL}/members_info?email=${userInfo.email}`).subscribe(
            data => {
                if(_.isEmpty(data)){
                    this.usernameRegistered(userInfo);
                }else{
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

    usernameRegistered(userInfo): void{
        this.httpClient.get(`${Constants.BASE_URL}/members_info?username=${userInfo.username}`).subscribe(
            data => {
                if(_.isEmpty(data)){
                    this.register(userInfo);
                }else{
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

    register(userInfo): void {
        this.httpClient.
            post(`${Constants.BASE_URL}/members_info`, userInfo).
            subscribe(
                data => {
                    this.stateService.go("feed");
                },
                err => {
                    this.hasError = true;
                    this.errorMessage = ("Error Occured! Please try again later");
                    
                }
            );
    }

    signIn(userInfo): void{
        this.httpClient.get(`${Constants.BASE_URL}/members_info?username=${userInfo.username}&password=${userInfo.password}`).
        subscribe(
            data => {
                if(_.isEmpty(data)){
                    this.errorMessage = ("Your username and password doesn't match.");
                }else{
                    this.stateService.go("feed");
                }
            },
            err => {
                this.errorMessage = ("Error Occured! Please try again later");
            }
        )
    }
}