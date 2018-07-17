import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { ErrorService } from './error.service';
import { User } from '../../models/user';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

  /** Production/Development API URL */
  API = environment.apiUrl;
  editUserEvent = new EventEmitter<any>();

  constructor(private http: HttpClient,
              private authService: AuthenticationService,
              private errorService: ErrorService) {}

  subscribeToTopic(): Observable<Boolean> {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    user.usingWeekelyTopic = true;

    return this.editUser(user);
  }

  unsubscribeToTopic(): Observable<Boolean> {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    user.usingWeekelyTopic = false;
    return this.editUser(user);
  }

  /**
   * Requests the edition of a user.
   * @param userData - The new user data.
   */
  editUser(userData: User): Observable<Boolean> {
    const httpOptions = this.authService.getOptions();
    const userId = JSON.parse(sessionStorage.getItem('currentUser')).id;

    return this.http.put(this.API.concat('users/' + userId), userData, httpOptions)
      .map((res: Response) => {
        if (res) {
          sessionStorage.setItem('currentUser', JSON.stringify(res));
          return true;
        }
        return false;
      }).catch((error: Response) => {
        this.errorService.handleError(error);
        return  Observable.throw(error);
      });
  }

  /**
   * Requests the creation of a user.
   * @param userData - The user related data.
   */
  createUser(userData: User): Observable<Boolean> {
    return this.http.post(this.API.concat('users'), userData)
    .map((res: Response) => {
      if (res) {
        return true;
      }
      return false;
    }).catch((error: Response) => {
      this.errorService.handleError(error);
      return  Observable.throw(error);
    });
  }
}
