import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private activeCard: string;
  private userInfo: any;

  constructor(private postService: PostService,
    private userService: UserService,
    private route: ActivatedRoute) {
      
    this.activeCard = "Posts"
    route.params.subscribe(
      params =>{
        this.postService.getProfilePost(params.username);
        this.userService.getUserInformation(params.username);
      }
    );
    }

  ngOnInit() {
  }

  activate(activate){
    this.activeCard = activate;
  }

}
