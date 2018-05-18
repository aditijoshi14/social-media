import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import * as _ from 'lodash';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  private user: any;
  private errorMessage: string;
  constructor(private stateService: StateService,
    private authService: AuthService) {}

  ngOnInit() {
    this.user = {};
    this.errorMessage = this.authService.errorMessage;
  }

  register(): void {
      this.authService.signIn(this.user);
  }

  // validInput(): boolean {
  //   if (_.isEmpty(this.user.fullName) ||
  //     _.isEmpty(this.user.email) ||
  //     _.isEmpty(this.user.username) ||
  //     _.isEmpty(this.user.password) ||
  //     this.user.username.length < 8 ||
  //     this.user.password.length < 8) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
}
