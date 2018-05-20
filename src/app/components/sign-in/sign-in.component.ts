import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  private user: any;
  private errorMessage: String;
  constructor(private stateService: StateService,
    private authService: AuthService) { }

  ngOnInit() {
    this.user = {};
  }

  logIn(): void{
    this.authService.signIn(this.user);
  }
}
