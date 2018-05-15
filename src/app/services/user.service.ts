import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.post(this.API.concat('tuiterapi/users/edit'), userData)
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
