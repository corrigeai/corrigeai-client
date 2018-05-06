import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

import {EditUserBody, LoginBody, RegistrationBody} from '../models/body-obj.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

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

  editUser(userData: EditUserBody): Observable<Boolean> {
    return this.http.post(this.API.concat('/edit-user'), userData)
      .map((res: Response) => {
        if (res) {
          return true;
        }
        return false;
      }).catch((error: Response) => {
        return  Observable.throw(error.json());
      });
  }
}
