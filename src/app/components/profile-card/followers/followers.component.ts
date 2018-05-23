import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  private empty:boolean;
  private noFollowersMessage: string;
  constructor(private userService: UserService,
    private router: Router) { 
      this.noFollowersMessage = "";
  }

  ngOnInit() {
  }

  checkIfEmpty(){
    if(this.userService.userFullInfo.followersLength == 0){
      this.setNofollowersMessage();
      return true;
    }
  }

  setNofollowersMessage(){
    if(this.router.url.match("profile")){
      this.noFollowersMessage = "You don't have any followers!";
    }else{
      this.noFollowersMessage = "No followers";
    }
  }

}
