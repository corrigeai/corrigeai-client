import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  API = environment.apiUrl;

  constructor(private http: HttpClient) { }

  signUp(userData: any): Observable<Boolean> {
    return this.http.post(this.API.concat('/user'), userData)
    .map((res: Response) => {
      if (res) {
        return true;
      }
      return false;
    });
  }

  login(userData: any): Observable<Boolean> {
    return this.http.post(this.API.concat('/auth'), userData)
    .map((res: Response) => {
      if (res) {
        localStorage.setItem('currentUser', JSON.stringify(res));
        return true;
      }
      return false;
    });
  }
}
