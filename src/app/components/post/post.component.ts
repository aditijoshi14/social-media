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
  private post_image_src: string;
  @Input() post: Post;

  constructor(private postService: PostService,
    private stateService: StateService) {
  }

  ngOnInit() {
    this.post_image_src = "../../../assets/images/profile.jpg"
    this.isUpVoted();
    this.isDownVoted();
  }

  goProfile() {
    this.stateService.go(`u/${this.post.postContributerId}`);
  }

  upVote() {
    this.postService.upVote(this.post);
  }

  downVote() {
    this.postService.downVote(this.post);
  }

  isUpVoted() {
    this.post.up = (this.postService.checkIfVoted(this.post) == 0);
  }

  isDownVoted() {
    this.post.down = (this.postService.checkIfVoted(this.post) == 1);
  }


}
