import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../app.constant';
import { Post } from '../../app.interface';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { AuthInfoService } from '../../services/authInfo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private activeCard: string;
  constructor(private userInfo: AuthInfoService,
    private postService: PostService,
    private userService: UserService) {
    this.activeCard = "Posts"
    this.postService.getProfilePost(`${this.userInfo.info.id}${this.userInfo.info.username}`);
    this.userService.getUserInformation(`${this.userInfo.info.id}${this.userInfo.info.username}`);
  }

  ngOnInit() {
  }

  activate(activate){
    this.activeCard = activate;
  }

}
