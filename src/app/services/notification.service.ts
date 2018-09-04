import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { Notification } from '../../models/notification';
import { Review } from '../../models/review';

import { Observable } from 'rxjs/Observable';
import {StompService} from '@stomp/ng2-stompjs';
import * as SockJS from 'sockjs-client';

@Injectable()
export class NotificationService {

  /** Event emitter to notify a change on the notification collection */
  notificationCollectionChanged = new EventEmitter<any>();
  private notificationsCollection: any[] = [];
  /** Production/Development API URL */
  API = environment.apiUrl;
  private stompClient;

  constructor(private http: HttpClient,
              private authService: AuthenticationService,
              private _stompClient: StompService) {}

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

  // Event Emission related methods

  /**
   * Emits event notifying notifications collection has changend.
   */
  notifyNotificationCollectionChanged(): void {
    this.notificationCollectionChanged.emit();
  }

  /**
   * Emits event notifying a notification has been deleted.
   */
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

  /**
   * Requests deletion of a notification.
   * @param id - Id of the notification to be deleted.
   */
  deleteNotification(id): Observable<any> {
    const httpOptions = this.authService.getOptions();
    return this.http.delete(this.API.concat('notifications/' + id), httpOptions)
    .map((response: Response) => response)
    .catch((error: Response) => {
        return  Observable.throw(error);
    });
  }

  /**
   * Requests the deletion of all notifications of the
   * currently validated user.
   */
  deleteAllUserNotifications(): Observable<any> {
    const userId = JSON.parse(sessionStorage.getItem('currentUser')).id;
    const httpOptions = this.authService.getOptions();
    return this.http.delete(this.API.concat('users/' + userId + '/notifications/all'), httpOptions)
    .map((response: Response) => response)
    .catch((error: Response) => {
        return  Observable.throw(error);
    });
  }

  /**
   * Requests the notifications of the currently validated user.
   */
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

  /**
   * Engages websocket between client and api.
   */
  connect(receivedNotificationHandler): void {
    const entrypoint = this.API.concat('notifications/ws');
    const userId = JSON.parse(sessionStorage.getItem('currentUser')).id;
    //const socket = new SockJS(entrypoint);

    /*this.stompClient = Stomp.over(socket);

    const that = this;

    this.stompClient.connect({}, function(frame) {*/
      // Subscribe to the user channel
      /*that.stompClient.subscribe('notification_ch/' + userId, receivedNotificationHandler);
    });*/

    //this._stompClient.initAndConnect();
    this._stompClient.subscribe('notification_ch/' + userId);
  }

  /**
   * Disengages websocket between client and api.
   */
  disconnect(): void {
    this._stompClient.disconnect();
  }

  /**
   * Sends notification to api through engaged websocket.
   */
  sendReviewNotification(essayId): void {
    const userId = JSON.parse(sessionStorage.getItem('currentUser')).id;

    const notificationData = {};
    notificationData['userId'] =  userId;

    this._stompClient.publish('send/message/' + essayId, JSON.stringify(notificationData));
  }
}
