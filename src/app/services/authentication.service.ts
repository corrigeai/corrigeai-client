import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {LoginBody, RegistrationBody, UpdatePassBody} from '../models/body-obj.model';
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
    return this.http.patch(this.API.concat('tuiterapi/users/pass'), userData)
    .map((res: Response) => {
      if (res) {
        return true;
      }
      return false;
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
