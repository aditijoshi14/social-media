import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Constants } from '../../app.constant';
import { HttpClient } from '@angular/common/http';
import { AuthInfoService } from '../../services/authInfo.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  constructor(private postService: PostService, 
    private authInfoService: AuthInfoService) {
      
  }

  ngOnInit() {
   this.postService.loadFeedFollowing();
   this.postService.getProfilePost(this.authInfoService.info.userId);
  }
}
