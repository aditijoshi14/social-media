import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AuthInfoService } from '../../services/authInfo.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private activeCard: string;
  private userInfo: any;
  private userId: string;
  private followingStatus: string;
  constructor(private postService: PostService,
    private userService: UserService,
    private route: ActivatedRoute, 
    private authInfoService: AuthInfoService) {
    route.params.subscribe(
      params =>{
        this.followingStatus = "";
        this.activeCard = "Posts"
        this.postService.getProfilePost(params.userId);
        this.userService.getUserInformation(params.userId);
        this.userId = params.userId;
        this.userService.checkIfFollowing(this.userId);
      }
    );
    }

  ngOnInit() {
  }

  followUnfollow(){
    this.userService.followOrUnfollow(this.userId, this.userService.userFullInfo.fullName);
  }
  activate(activate){
    this.activeCard = activate;
  }

}
