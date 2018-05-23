import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  private empty:boolean;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  checkIfEmpty(){
    if(this.userService.userFullInfo.followersLength == 0){
      return true;
    }
  }

}
