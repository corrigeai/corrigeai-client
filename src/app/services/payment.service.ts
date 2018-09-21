import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ErrorService } from './error.service';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PaymentService {
  API = environment.apiUrl;

  constructor(private http: HttpClient,
    private authService: AuthenticationService,
    private errorService: ErrorService) { }


  createRecord(recordData): Observable<any> {
    const httpOptions = this.authService.getOptions();
    return this.http.post(this.API.concat('payments'), recordData, httpOptions)
    .map((response: Response) => response)
    .catch((error: Response) => {
        this.errorService.handleError(error);
        return  Observable.throw(error);
      });
  }

  addPack(packData): Observable<any> {
    const httpOptions = this.authService.getOptions();
    return this.http.post(
        this.API.concat('packs'), packData, httpOptions)
    .map((response: Response) => response)
    .catch((error: Response) => {
        this.errorService.handleError(error);
        return  Observable.throw(error);
      });
  }

  getPacks(): Observable<any> {
    const httpOptions = this.authService.getOptions();
    const userId = JSON.parse(sessionStorage.getItem('currentUser')).id;
    return this.http.get(
        this.API.concat('packs/' + userId), httpOptions)
    .map((response: Response) => response)
    .catch((error: Response) => {
        this.errorService.handleError(error);
        return  Observable.throw(error);
      });
  }

  getLastValidPack(): Observable<any> {
    const httpOptions = this.authService.getOptions();
    const userId = JSON.parse(sessionStorage.getItem('currentUser')).id;
    return this.http.get(
        this.API.concat('packs/' + userId + '/actual'), httpOptions)
    .map((response: Response) => response)
    .catch((error: Response) => {
        return  Observable.throw(error);
      });
  }
}
