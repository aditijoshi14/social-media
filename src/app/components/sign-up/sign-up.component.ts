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
  constructor(private stateService: StateService,
    private authService: AuthService) {}

  ngOnInit() {
    this.user = {};
  }

  register(): void {
    this.user.following = [];
    this.user.followers = [];
    this.authService.signUp(this.user);  
  }
}
