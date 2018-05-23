import { Component, OnInit, Input } from '@angular/core';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent implements OnInit {
  @Input() follow;
  private follow_image_src: string

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.follow_image_src = "../../../assets/images/profile.jpg"
  }

  goProfile(){
    this.stateService.go(`u/${this.follow.userId}`)
  }

}
