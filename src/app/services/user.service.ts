import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import {EditUserBody} from '../models/body-obj.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class UserService {

  API = environment.apiUrl;

  constructor(private http: HttpClient) { }

  editUser(userData: EditUserBody): Observable<Boolean> {
    const token =  JSON.parse(localStorage.getItem('token'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    const userId = JSON.parse(localStorage.getItem('currentUser')).id;
    return this.http.put(this.API.concat('tuiterapi/users/'+userId), userData, httpOptions)
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
}
