import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent implements OnInit {
  @Input() follow;
  private follow_image_src: string

  constructor() { }

  ngOnInit() {
    this.follow_image_src = "../../../assets/images/profile.jpg"
  }

}
