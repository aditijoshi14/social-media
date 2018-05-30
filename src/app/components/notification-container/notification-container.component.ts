import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification-container',
  templateUrl: './notification-container.component.html',
  styleUrls: ['./notification-container.component.scss']
})
export class NotificationContainerComponent implements OnInit {

  constructor(private notificationService: NotificationService) {
    
  }

  ngOnInit() {
    this.notificationService.getNotification();
  }

}
