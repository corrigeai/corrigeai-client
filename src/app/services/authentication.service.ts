import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient, @Inject('API') private API: string) { }
  
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
