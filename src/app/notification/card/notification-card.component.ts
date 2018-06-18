import { Component, OnInit, Input } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';
import { Notification } from '../../../models/notification';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-notification-card',
    templateUrl: './notification-card.component.html',
    styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent implements OnInit {
    @Input() notification: Notification;

    constructor(private notificationService: NotificationService) {}

    ngOnInit() {

    }

    onDeleteNotification() {
      this.notificationService.deleteNotification(this.notification.id).subscribe(
        () => {
          this.notificationService.notifyNotificationDeletion(this.notification);
        }
      );
    }
}
