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
    return this.http.post(this.API.concat('/user'), userData)
    .map((res: Response) => {
      if (res) {
        return true;
      }
      return false;
    }).catch((error: Response) => {
      return  Observable.throw(error.json());
    });
  }

  login(userData: LoginBody): Observable<Boolean> {
    return this.http.post(this.API.concat('/auth'), userData)
    .map((res: Response) => {
      if (res) {
        localStorage.setItem('currentUser', JSON.stringify(res));
        return true;
      }
      return false;
    }).catch((error: Response) => {
        return  Observable.throw(error.json());
      });
  }

  updatePassword(userData: UpdatePassBody) {

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
