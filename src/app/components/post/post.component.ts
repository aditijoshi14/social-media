import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../app.interface';

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
  
  constructor() {
  }

  ngOnInit() {
    this.post_name = "Aditi Joshi"
    this.post_image_src = "../../../assets/images/profile.jpg"
    this.post_time = "2 hrs"
    this.post_content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    this.post_numVotes = 8;
  }

}
