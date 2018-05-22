import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  private isProfileState: boolean;
  constructor(private stateService: StateService,
    private storage: LocalStorageService,
    private router: Router) {
    if (this.router.url.match("\profile")) {
      this.isProfileState = true;
    }else{
      
      this.isProfileState = false;
    }

  }

  ngOnInit() {
  }

  viewFeed():void{
    this.stateService.go('feed');
  }

  logOut(): void {
    this.storage.remove('userInfo');
    this.stateService.go('/');
  }

  viewProfile(): void {
    this.stateService.go('profile');
  }

}
