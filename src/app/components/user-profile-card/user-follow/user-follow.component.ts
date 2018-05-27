import { Component, OnInit, Input } from '@angular/core';
import { StateService } from '../../../services/state.service';
import { UserService } from '../../../services/user.service';
import { AuthInfoService } from '../../../services/authInfo.service';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../../app.constant';

@Component({
  selector: 'app-user-follow',
  templateUrl: './user-follow.component.html',
  styleUrls: ['./user-follow.component.scss']
})
export class UserFollowComponent implements OnInit {
  @Input() follow;
  private follow_image_src: string;
  private followingNotfollowing: string;


  constructor(private stateService: StateService,
    private userService: UserService,
    private authInfoService: AuthInfoService,
    private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.follow_image_src = "../../../../assets/images/profile.jpg"
    this.checkIfFollowing();

  }

  goProfile() {
    this.stateService.go(`u/${this.follow.userId}`)
  }


  checkIfFollowing() {

    // if (this.userService.checkIfFollowing(this.follow.userId)) {
    //   this.followingNotfollowing = "Following";
    // } else {
    //   this.followingNotfollowing = "Follow";
    // }
    let following = this.authInfoService.info.following;
    if (_.some(following, { "userId": `${this.follow.userId}` })) {
      this.followingNotfollowing = "Following";
      return true;
    } else {
      this.followingNotfollowing = "Follow";
      return false;
    }
  }

  followUnfollow() {
    this.httpClient.get(`${Constants.BASE_URL}/members_info?userId=${this.follow.userId}`).subscribe(
      (data: any) => {
        if (this.checkIfFollowing()) {
          this.userService.unfollow(this.follow.userId, data[0]);
        } else {
          this.userService.follow(this.follow.userId, data[0]);
        }
        err => { }
      }
    )

  }
}
