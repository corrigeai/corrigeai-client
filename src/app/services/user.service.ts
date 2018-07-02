import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  API = environment.apiUrl;

  constructor(private http: HttpClient,
              private authService: AuthenticationService,
              private errorService: ErrorService) {}

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
