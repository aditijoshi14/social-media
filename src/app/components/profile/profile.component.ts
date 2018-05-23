import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../app.constant';
import { Post } from '../../app.interface';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private activeCard: string;
  constructor(private storage: LocalStorageService,
    private postService: PostService,
    private userService: UserService) {
    this.activeCard = "Posts"
    
    let userInfo: any = storage.get('userInfo');
    this.postService.getProfilePost();
    this.userService.getUserInformation(`${userInfo.id}${userInfo.username}`);
  }

  ngOnInit() {
  }

  activate(activate){
    this.activeCard = activate;
  }

}
