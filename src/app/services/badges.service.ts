import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { ErrorService } from './error.service';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class BadgesService {

    /** Production/Development API URL */
    API = environment.apiUrl;

    constructor(private http: HttpClient,
        private authService: AuthenticationService,
        private errorService: ErrorService) {}

    /**
     * Requests the badges of a user.
     * @param userId - Requesting user id.
     */
    getBadgesByUserId(): Observable<any> {
        const httpOptions = this.authService.getOptions();
        const userId = JSON.parse(sessionStorage.getItem('currentUser')).id;
        return this.http.get(this.API.concat('users/badges/' + userId), httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }
}
