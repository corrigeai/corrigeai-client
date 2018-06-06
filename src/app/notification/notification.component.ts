import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';
import { Notification } from '../../models/notification';

@Component({
    selector: 'app-error',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
    private serverUrl = 'http://localhost:3000/tuiterapi/notifications/ws';
    private stompClient;
    private n;

    notification: Notification;
    display = 'block';

    constructor() {
      this.initializeWebSocketConnection();
      console.log('wow');
      this.n = 1;
    }

    onNotificationHandled() {
        this.display = 'block';
    }

    ngOnInit() {

    }

    initializeWebSocketConnection() {
      let socket = new SockJS(this.serverUrl);

      this.stompClient = Stomp.over(socket);
      const that = this;
      this.stompClient.connect({}, function(frame) {
        console.log(frame);
        that.stompClient.subscribe('/chat', (message) => {
          console.log("recebeu");
          if (message.body) {
            console.log("A mensagem é: " + message.body);

            //$('.chat').append('<div class="message">' + message.body + '</div>');
          }
        });
      });
    }

    sendMessage() {
      let notificationData = {};
      notificationData['userId'] = JSON.parse(localStorage.getItem('currentUser')).userId;
      notificationData['reviewId'] = 'dasdsjdlaskj';
      notificationData['description'] = 'This is a custom notification: ' + this.n;

      this.stompClient.send('/tuiterapi/send/message' , {}, JSON.parse(notificationData));
    }
}
