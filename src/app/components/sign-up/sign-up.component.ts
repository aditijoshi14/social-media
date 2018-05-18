import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  private user: any;
  private errorMessage: string;
  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.user = {};
  }

  register(): void {
    if (this.validInput()) {
      this.stateService.go("feed");
    }
  }

  validInput(): boolean {
    if (_.isEmpty(this.user.email) ||
      _.isEmpty(this.user.username) ||
      _.isEmpty(this.user.password) ||
      _.isEmpty(this.user.confirmPassword) ||
      this.user.username.length < 8 ||
      this.user.password.length < 8 ||
      this.user.password != this.user.confirmPassword ||
      this.checkRegister() == 1 ||
      this.checkRegister() == 2) {
      return false;
    } else {
      return true;
    }
  }

  checkRegister(): number {
    if (this.user.username == "joshiad") {
      return 1;
    } else if (this.user.email == "joshiad@dickinson.edu") {
      return 2;
    } else {
      return 0;
    }
  }

  hasError(): boolean {
    if (_.isEmpty(this.user.email)) {
      this.errorMessage = "Please enter your email address";
    } else if (_.isEmpty(this.user.username)) {
      this.errorMessage = "Please enter a username";
    } else if (this.user.username.length < 8) {
      this.errorMessage = "Your username must be at least 8 character";
    } else if (_.isEmpty(this.user.password)) {
      this.errorMessage = "Please enter a password";
    } else if (this.user.password.length < 8) {
      this.errorMessage = "Your password must be at least 8 character";
    } else if (_.isEmpty(this.user.confirmPassword)) {
      this.errorMessage = "Please confirm your password";
    } else if (this.user.password != this.user.confirmPassword) {
      this.errorMessage = "Your password does not match";
    } else if (this.checkRegister() == 1) {
      this.errorMessage = "Your username has already been taken";
    } else if (this.checkRegister() == 2) {
      this.errorMessage = "This email address is already associated with an account";
    } else {
      return false;
    }
    return true;
  }

}
