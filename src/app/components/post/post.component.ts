import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../app.interface';
import { PostService } from '../../services/post.service';
import { StateService } from '../../services/state.service';

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
  
  constructor(private postService: PostService,
    private stateService: StateService) {
  }

  ngOnInit() {
    this.post_image_src = "../../../assets/images/profile.jpg"
  }

  goProfile(){
    this.stateService.go(`u/${this.post.postContributerId}`);
  }

}
