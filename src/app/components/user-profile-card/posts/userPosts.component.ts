import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../app.interface';

@Component({
  selector: 'app-user-posts',
  templateUrl: './userPosts.component.html',
  styleUrls: ['./userPosts.component.scss']
})
export class UserPostsComponent implements OnInit {
  private posts: Post;
  constructor(private postService:PostService) {
   }

  ngOnInit() {
  }

}
