import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  checkIfEmpty(){
    if(this.userService.userFullInfo.followingLength == 0){
      return true;
    }
  }

}
