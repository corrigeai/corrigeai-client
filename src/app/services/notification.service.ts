import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { Notification } from '../../models/notification';
import { Review } from '../../models/review';

import { Observable } from 'rxjs/Observable';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable()
export class NotificationService {

  notificationCollectionChanged = new EventEmitter<any>();
  private notificationsCollection: any[] = [];
  API = environment.apiUrl;
  private stompClient;

  constructor(private http: HttpClient, private authService: AuthenticationService) {}

  // notificatinsCollection related Methods

  updateNotificationElement(original: Notification, newNotification: Notification): void {
    const index = this.notificationsCollection.indexOf(original);
    this.notificationsCollection[index] = newNotification;
  }

  addNotificationElement(notification: Notification): void {
    this.notificationsCollection.push(notification);
    console.log(this.notificationsCollection);
  }

  setNotificationCollection(notificationsCollection: Notification[]): void {
    this.notificationsCollection = notificationsCollection;
  }

  getNotificationCollection(): Notification[] {
    return this.notificationsCollection;
  }

  resetNotificationCollection(): void {
    this.notificationsCollection = [];
  }

  notifyNotificationCollectionChanged(): void {
    this.notificationCollectionChanged.emit();
  }

  notifyNotificationDeletion(deletedNotification: Notification): void {
    this.notificationsCollection = this.notificationsCollection
            .filter(notification => notification.id !== deletedNotification.id);
  }

  // HTTP related Methods

  viewUserNotifications(): Observable<any> {
    const httpOptions = this.authService.getOptions();
    const userId = JSON.parse(sessionStorage.getItem('currentUser')).id;

    return this.http.patch(this.API.concat('users/' + userId + '/notifications'), {}, httpOptions)
                    .map((response: Response) => response)
                    .catch((error: Response) => {
                      return  Observable.throw(error);
            });
  }

  deleteNotification(id): Observable<any> {
    const httpOptions = this.authService.getOptions();
    return this.http.delete(this.API.concat('notifications/' + id), httpOptions)
    .map((response: Response) => response)
    .catch((error: Response) => {
        return  Observable.throw(error);
    });
  }

  deleteAllUserNotifications(): Observable<any> {
    const userId = JSON.parse(sessionStorage.getItem('currentUser')).id;
    const httpOptions = this.authService.getOptions();
    return this.http.delete(this.API.concat('users/' + userId + '/notifications/all'), httpOptions)
    .map((response: Response) => response)
    .catch((error: Response) => {
        return  Observable.throw(error);
    });
  }

  getUserNotifications(): Observable<any> {
    const httpOptions = this.authService.getOptions();
    const userId = JSON.parse(sessionStorage.getItem('currentUser')).id;
    return this.http.get<Notification[]>(this.API.concat('users/' + userId + '/notifications'), httpOptions)
            .map((essays: Notification[]) => essays)
            .catch((error: Response) => {
            return  Observable.throw(error);
          });
  }

  // Web Socket related Methods

  connect(receivedNotificationHandler): void {
    const entrypoint = this.API.concat('notifications/ws');
    const userId = JSON.parse(sessionStorage.getItem('currentUser')).id;
    const socket = new SockJS(entrypoint);

    this.stompClient = Stomp.over(socket);
    const that = this;

    this.stompClient.connect({}, function(frame) {
      // Subscribe to the user channel
      that.stompClient.subscribe('notification_ch/' + userId, receivedNotificationHandler);
    });
  }

  disconnect(): void {
    this.stompClient.disconnect();
  }

  sendReviewNotification(essayId): void {
    const userId = JSON.parse(sessionStorage.getItem('currentUser')).id;

    const notificationData = {};
    notificationData['userId'] =  userId;

    this.stompClient.send('send/message/' + essayId, {}, JSON.stringify(notificationData)) ;
  }
}
