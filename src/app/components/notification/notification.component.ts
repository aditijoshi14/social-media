import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() notification;
  private notification_image_src: string;
  constructor(private notificationService: NotificationService, 
    private stateService: StateService) { 
    this.notification_image_src = "../../../../assets/images/profile.jpg";
  }

  ngOnInit() {
  }

  notificationClick(){
    if(this.notification.notificationId == 1){
      this.stateService.go(`u/${this.notification.notificationContributerUserId}`)
    }else if(this.notification.notificationId ==2){
      this.stateService.go(`profile`)
    }
    this.notificationService.notificationOpen = false;
  }

}
