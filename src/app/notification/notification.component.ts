import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';
import { Notification } from '../../models/notification';
import { NotificationService } from '../services/notification.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
    notifications: Notification[];
    display = 'block';

    constructor(private notificationService: NotificationService) {
      this.notificationService = this.notificationService;

      const that  = this;

      this.notificationService.connect((notificationFrame) => {
        if (notificationFrame.body) {
          that.notificationService.addNotificationElement(notificationFrame.body);
          that.notifications = that.notificationService.getNotificationCollection();
        }
      });
    }

    onNotificationHandled() {
        this.display = 'block';
    }

    ngOnInit() {
      this.notificationService.getUserNotifications().subscribe(
        (notifications) => {
          this.notificationService.setNotificationCollection(notifications);
          this.notifications = this.notificationService.getNotificationCollection();
          this.notificationService.viewUserNotifications().subscribe(
            (vNotifications) => {
              this.notificationService.setNotificationCollection(vNotifications);
              this.notifications = this.notificationService.getNotificationCollection();
            }
          );
      });
    }
}
