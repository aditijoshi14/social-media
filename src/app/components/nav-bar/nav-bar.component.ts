import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private stateService: StateService,
    private storage: LocalStorageService) { }

  ngOnInit() {
  }

  logOut():void{
    this.storage.remove('userInfo');
    this.stateService.go('/');
  }

}
