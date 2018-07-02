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

  userHasLoggedOut = new EventEmitter<any>();
  userHasLoggedIn = new EventEmitter<any>();
  API = environment.apiUrl;
  isLogged;

  constructor(private http: HttpClient,
              private errorService: ErrorService) {}

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

  login(userData: { email: string, password: string }): Observable<any> {
    return this.http.post(this.API.concat('auth/login'), userData)
    .map((response: Response) => response)
    .catch((error: Response) => {
        this.errorService.handleError(error);
        return  Observable.throw(error);
      });
  }

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

  logOut(): void {
    this.isLogged = false;
    sessionStorage.clear();
  }

  isLoggedIn(): Observable<boolean> {
    return Observable.create(
      (observer: Observer<boolean>) => {
        observer.next(sessionStorage.getItem('token') !== null);
      }
    );
  }

  notifyUserLogIn(): void {
    this.isLogged = true;
    this.userHasLoggedIn.emit();
  }

  notifyUserLogOut(): void {
    this.userHasLoggedOut.emit();
  }

}
