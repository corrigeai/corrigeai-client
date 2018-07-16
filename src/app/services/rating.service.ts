import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { ErrorService } from './error.service';
import { Rating } from '../../models/rating';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class RatingService {

    /** Production/Development API URL */
    API = environment.apiUrl;

    constructor(private http: HttpClient,
        private authService: AuthenticationService,
        private errorService: ErrorService) {}

    /**
     * Requests the edition of a rating.
     * @param ratingData - The new rating data.
     * @param ratingId - Id of the rating to be edited.
     */
    editRating(ratingData: Rating, ratingId: string): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.put(this.API.concat('reviews/rating/' + ratingId), ratingData, httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    /**
     * Requests the creation of a rating.
     * @param ratingData - The rating related data.
     */
    createRating(ratingData: Rating): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.post(this.API.concat('reviews/rating'), ratingData, httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    /**
     * Requests a rating by its id.
     * @param ratingId - Requested rating id.
     */
    getRatingById(ratingId: string): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.get(this.API.concat('reviews/rating/' + ratingId), httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    /**
     * Requests the deletion of a rating.
     * @param ratingId - To be deleted rating id.
     */
    deleteRating(ratingId: string): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.delete(this.API.concat('reviews/rating/' + ratingId), httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    /**
     * Requests rating related to specific user.
     * @param userId - Id of the user.
     */
    getRatingsByUserId(userId: string): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.get(this.API.concat('users/' + userId + '/ratings'), httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    getRatingsOfCurrentUser() {
        let id = JSON.parse(sessionStorage.getItem('currentUser')).id;
        return this.getRatingsByUserId(id);
    }

}

