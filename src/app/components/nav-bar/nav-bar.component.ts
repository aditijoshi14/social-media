import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { StateService } from '../../services/state.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { AuthInfoService } from '../../services/authInfo.service';
import { SearchService } from '../../services/search.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @ViewChild('searchBar')
  private searchBar: ElementRef
  private isProfileState: boolean;
  private isFeedState: boolean;
  private wasInside: boolean;

  constructor(private stateService: StateService,
    private storage: LocalStorageService,
    private router: Router,
    private postService: PostService,
    private userService: UserService,
    private authInfoService: AuthInfoService,
    private searchService: SearchService,
    private notificationService: NotificationService
  ) {
    this.isProfileState = false;
    this.isFeedState = false;
  }

  ngOnInit() {
    if (this.router.url.match("/profile") || this.router.url.startsWith("/u")) {
      this.isProfileState = true;
    } 

    if (this.router.url.match("/feed")) {
      this.isFeedState = true;
    }
  }

  viewNotification(){
    this.notificationService.notificationOpen = !this.notificationService.notificationOpen;
  }

  viewFeed(): void {
    this.stateService.go('feed');
  }

  logOut(): void {
    this.storage.remove('userInfo');
    this.stateService.go('/');
    this.userService.clear();
    this.postService.clear();
    this.authInfoService.clear();
    this.notificationService.clear();
  }

  viewProfile(): void {
    this.stateService.go('profile');
  }

  @HostListener('click', ['$event.target'])
  clickInside(targetElement) {
    if (this.searchBar.nativeElement.contains(targetElement)) {
      this.wasInside = true;
    }
  }

  @HostListener('document:click')
  clickout() {
    if (!this.wasInside) {
      this.searchService.clear();
    }
    this.wasInside = false;
  }
}
