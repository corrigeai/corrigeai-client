import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {LoginBody, RegistrationBody, UpdatePassBody} from '../models/body-obj.model';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class AuthenticationService {

  API = environment.apiUrl;

  constructor(private http: HttpClient) { }

  signUp(userData: RegistrationBody): Observable<Boolean> {
    return this.http.post(this.API.concat('/tuiterapi/users/signup'), userData)
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
    return this.http.post(this.API.concat('/tuiterapi/authentication/login'), userData)
    .map((response: Response) => response.json())
    .catch((error: Response) => {
        return  Observable.throw(error.json());
      });
  }

  updatePassword(userData: UpdatePassBody) {
    return this.http.put(this.API.concat('/users/reset_password'), userData)
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
