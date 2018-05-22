import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../app.constant';
import { Post } from '../../app.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private fullName: string;
  private username: string;
  private id: number;
  private posts: Post;

  constructor(private storage: LocalStorageService,
    private httpClient: HttpClient,
    private postService: PostService) {
    let userInfo: any = storage.get('userInfo');
    this.fullName = userInfo.fullName;
    this.username = userInfo.username;
    this.id = userInfo.id;
    this.postService.getProfilePost();
  }

  ngOnInit() {
  }

}
