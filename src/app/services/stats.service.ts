import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { ErrorService } from './error.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StatsService {

  API = environment.apiUrl;

  constructor(private http: HttpClient,
    private authService: AuthenticationService,
    private errorService: ErrorService) { }

  getUserEvolution(userId: string): Observable<any> {
    const httpOptions = this.authService.getOptions();
    return this.http.get(this.API.concat('metrics/evolution/', userId), httpOptions)
    .map((response: Response) => response)
    .catch((error: Response) => {
        this.errorService.handleError(error);
        return  Observable.throw(error);
      });
  }

  getApprovalRate(userId: string): Observable<any> {
    const httpOptions = this.authService.getOptions();
    return this.http.get(this.API.concat('metrics/eval-rating/', userId), httpOptions)
    .map((response: Response) => response)
    .catch((error: Response) => {
        this.errorService.handleError(error);
        return  Observable.throw(error);
      });
  }

  getMeanRatingPerRequirement(userId: string): Observable<any> {
    const httpOptions = this.authService.getOptions();
    return this.http.get(this.API.concat('metrics/rew-rating/', userId), httpOptions)
    .map((response: Response) => response)
    .catch((error: Response) => {
        this.errorService.handleError(error);
        return  Observable.throw(error);
      });
  }
}
