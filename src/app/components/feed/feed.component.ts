import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Constants } from '../../app.constant';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  constructor(private postService: PostService) {
  }

  ngOnInit() {
   this.postService.loadFeedFollowing();
  }
}
