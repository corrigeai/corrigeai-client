import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { environment } from '../../environments/environment';
import { ErrorService } from './error.service';
import { User } from '../../models/user';

import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService {

  /** Event emitter to notify the user has logged out */
  userHasLoggedOut = new EventEmitter<any>();
  /** Event emitter to notify the user has logged in */
  userHasLoggedIn = new EventEmitter<any>();
  /** Production/Development API URL */
  API = environment.apiUrl;
  /** Whether user is validated */
  isLogged;

  constructor(private http: HttpClient,
              private errorService: ErrorService) {}

  /**
   * Generates a description of the communication options for the target resource
   */
  getOptions(): { headers: HttpHeaders; } {
    const token =  JSON.parse(sessionStorage.getItem('token'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    return httpOptions;
  }

  /**
   * Attempts to validate user session with given login information.
   * @param loginData - The user login information.
   */
  login(loginData: { email: string, password: string }): Observable<any> {
    return this.http.post(this.API.concat('auth/login'), loginData)
    .map((response: Response) => response)
    .catch((error: Response) => {
        this.errorService.handleError(error);
        return  Observable.throw(error);
      });
  }

  /**
   * Attempts to replace validated user password information.
   * @param userData - Information about user's old and new password.
   */
  updatePassword(userData: { oldPassword: string, newPassword: string }): Observable<any> {
    const httpOptions = this.getOptions();
    const userId = JSON.parse(sessionStorage.getItem('currentUser')).id;

    return this.http.patch(this.API.concat('users/' + userId + '/pass'), userData, httpOptions)
    .map((res: Response) => {
        return true;
    }).catch((error: Response) => {
      this.errorService.handleError(error);
      return  Observable.throw(error);
    });
  }

  /**
   * Invalidates user session.
   */
  logOut(): void {
    this.isLogged = false;
    sessionStorage.clear();
  }

  /**
   * Checks whether user is validated.
   */
  isLoggedIn(): Observable<boolean> {
    return Observable.create(
      (observer: Observer<boolean>) => {
        observer.next(sessionStorage.getItem('token') !== null);
      }
    );
  }

  /**
   * Emits event notifying the user has logged in.
   */
  notifyUserLogIn(): void {
    this.isLogged = true;
    this.userHasLoggedIn.emit();
  }

  /**
   * Emits event notifying the user has logged out.
   */
  notifyUserLogOut(): void {
    this.userHasLoggedOut.emit();
  }

}
