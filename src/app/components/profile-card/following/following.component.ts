import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  private noFollowingMessage: string;
  constructor(private userService: UserService, 
  private router: Router) { 
    this.noFollowingMessage = "";
  }

  ngOnInit() {
  }


  checkIfEmpty(){
    if(this.userService.userFullInfo.followingLength == 0){
      this.setNofollowingMessage();
      return true;
    }
  }
  setNofollowingMessage(){
    if(this.router.url.match("profile")){
      this.noFollowingMessage = "You are not following anyone!";
    }else{
      this.noFollowingMessage = "Not following anyone";
    }
  }
}
