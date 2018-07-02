import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { ErrorService } from './error.service';

import { Observable } from 'rxjs/Observable';
import { Rating } from '../../models/rating';


@Injectable()
export class RatingService {

    API = environment.apiUrl;

    constructor(private http: HttpClient,
        private authService: AuthenticationService,
        private errorService: ErrorService) {}

    editRating(ratingData: Rating, ratingId: string): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.put(this.API.concat('reviews/rating/' + ratingId), ratingData, httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    createRating(ratingData: Rating): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.post(this.API.concat('reviews/rating/'), ratingData, httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    getRatingById(ratingId: string): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.get(this.API.concat('reviews/rating/' + ratingId), httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    deleteRating(ratingId: string): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.delete(this.API.concat('reviews/rating/' + ratingId), httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    getRatingsByUserId(userId: string): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.get(this.API.concat('users/' + userId + '/ratings'), httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

}

