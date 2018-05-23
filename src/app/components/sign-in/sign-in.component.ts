import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  private user: any;
  private errorMessage: String;
  private isRememberEnabled: boolean;
  constructor(private stateService: StateService,
    private authService: AuthService,
    private cookie: CookieService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe(val => {this.user = {};
    // Checking if the user selected remember me previously or not
    if (!_.isUndefined(this.cookie.get('credential'))) {
      var temp: any = JSON.parse(this.cookie.get('credential'));
      this.user.username = temp['username'];
      this.user.password = atob(temp['password']);
      this.authService.isRememberEnabled = true;
      this.isRememberEnabled = true;
    }
  })
  }

  ngOnInit() {
  }

  logIn(): void {
    this.authService.signIn(this.user);
  }
}
