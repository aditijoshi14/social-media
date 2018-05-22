import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../app.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  private post_name: string; 
  private post_image_src: string;
  private post_time: string;
  private post_content: string;
  private post_numVotes: number;
  @Input() post: Post;
  
  constructor(private postService: PostService) {
    
  }

  ngOnInit() {
    this.post_image_src = "../../../assets/images/profile.jpg"
   // console.log(this.post.fullName);
  }

}
