import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  private user: any;
  constructor(private postService: PostService,
  ) {
    postService.loadFeedPosts()
    
  }

  ngOnInit() {
  }

}
