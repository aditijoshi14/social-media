import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constant'
import { StateService } from './state.service';
import { Subscriber } from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
    errorMessage: string;
    constructor(private httpClient: HttpClient,
        private stateService: StateService) {
    }

    signIn(user): void {
        console.log("here");
        if (_.isEmpty(user.fullName)) {
          this.errorMessage = "Please enter your full name";
        } else if (_.isEmpty(user.email)) {
          this.errorMessage = "Please enter your email address";
        } else if (_.isEmpty(user.username)) {
          this.errorMessage = "Please enter a username";
        } else if (user.username.length < 8) {
          this.errorMessage = "Your username must be at least 8 character";
        } else if (_.isEmpty(user.password)) {
          this.errorMessage = "Please enter a password";
        } else if (user.password.length < 8) {
          this.errorMessage = "Your password must be at least 8 character";
        } else {
          this.emailRegistered(user);
        }
      }

    emailRegistered(userInfo): void{
        this.httpClient.get(`${Constants.BASE_URL}/members_info?email=${userInfo.email}`).subscribe(
            data => {
                if(_.isEmpty(data)){
                    this.usernameRegistered(userInfo);
                }else{
                    this.errorMessage = "Account is already created using this email."
                }
            },
            err => {
                console.log("Error Occured");
            }
            
        )
    }

    usernameRegistered(userInfo): void{
        this.httpClient.get(`${Constants.BASE_URL}/members_info?username=${userInfo.username}`).subscribe(
            data => {
                if(_.isEmpty(data)){
                    this.register(userInfo);
                }else{
                    this.errorMessage = "Account is already created using this email."
                }
            },
            err => {
                console.log("Error Occured");
            }
            
        )
    }

    register(userInfo): void {
        this.httpClient.
            post(`${Constants.BASE_URL}/members_info`, userInfo).
            subscribe(
                data => {
                    console.log(data); 
                    this.stateService.go("feed");
                },
                err => {
                    console.log("Error Occured");
                    
                }
            );
    }
}