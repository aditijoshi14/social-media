import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  private user: any;
  private errorMessage: String;
  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.user = {};
  }

  logIn(): void{
    if(this.matchCombination()){
      this.stateService.go("feed");
    }else{
      this.errorMessage = "Username and password doesn't match."
    }
  }

  matchCombination(): boolean {
    if (this.user.username == "joshiad" &&
      this.user.password == "asdf1234") {
      return true;
    }
    return false;
  }
}
