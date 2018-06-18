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
    }

    ngOnInit() {
      const that  = this;

      this.notificationService.connect((notificationFrame) => {
        if (notificationFrame.body) {
          that.notificationService.addNotificationElement(JSON.parse(notificationFrame.body));
          that.notifications = that.notificationService.getNotificationCollection();
        }
      });

      this.notificationService.getUserNotifications().subscribe(
        (notifications) => {
          this.notificationService.setNotificationCollection(notifications);
          this.notifications = this.notificationService.getNotificationCollection();
      });

      this.notificationService.notificationCollectionChanged.subscribe(
        () => {
          this.notifications = this.notificationService.getNotificationCollection();
        });
    }

    onClearAllClicked() {
      this.notificationService.deleteAllUserNotifications().subscribe(
        () => {
          this.notificationService.resetNotificationCollection();
        });
    }
}
