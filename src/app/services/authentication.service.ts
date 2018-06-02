import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {LoginBody, RegistrationBody, UpdatePassBody} from '../../models/body-obj.model';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class AuthenticationService {

  API = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOptions() {
    const token =  JSON.parse(localStorage.getItem('token'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    return httpOptions;
  }

  signUp(userData: RegistrationBody): Observable<Boolean> {
    return this.http.post(this.API.concat('tuiterapi/users'), userData)
    .map((res: Response) => {
      if (res) {
        return true;
      }
      return false;
    }).catch((error: Response) => {
      return  Observable.throw(error.json());
    });
  }

  login(userData: LoginBody): Observable<any> {
    return this.http.post(this.API.concat('tuiterapi/auth/login'), userData)
    .map((response: Response) => response)
    .catch((error: Response) => {
        return  Observable.throw(error);
      });
  }

  updatePassword(userData: UpdatePassBody) {
    const httpOptions = this.getOptions();
    const userId = JSON.parse(localStorage.getItem('currentUser')).id;

    return this.http.patch(this.API.concat('tuiterapi/users/'+userId+'/pass'), userData, httpOptions)
    .map((res: Response) => {
        return true;
    }).catch((error: Response) => {
      return  Observable.throw(error.json());
    });

  }


  logOut() {
    localStorage.clear();
  }

  isLoggedIn() {
    return Observable.create(
      (observer: Observer<boolean>) => {
        observer.next(localStorage.getItem('token') !== null);
      }
    );
  }

}
