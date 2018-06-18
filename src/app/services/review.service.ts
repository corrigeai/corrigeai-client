import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from "@angular/core";

import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { Review } from "../../models/review";

import { Observable } from 'rxjs/Observable';
import { ErrorService } from './error.service';

@Injectable()
export class ReviewService {

    private reviewsCollection: any[] = [];
    reviewDisplayed = new EventEmitter<any>();

    API = environment.apiUrl;

    constructor(private http: HttpClient,
        private authService: AuthenticationService,
        private errorService: ErrorService) {}

    // reviewsCollection related Methods

    updateReviewElement(original: Review, newReview: Review) {
        let index = this.reviewsCollection.indexOf(original);
        this.reviewsCollection[index] = newReview;
    }

    addReviewElement(Review: Review):void {
        this.reviewsCollection.push(Review);
    }

    setReviewCollection(ReviewCollection: Review[]): void {
        this.reviewsCollection = ReviewCollection;
    }

    getReviewCollection(): Review[] {
        return this.reviewsCollection;
    }

    // HTTP related Methods

    updateReview(reviewData, reviewId): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.put(this.API.concat('tuiterapi/reviews/'.concat(reviewId)), reviewData, httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }

    getReviewsAboutUser(): Observable<any> {
        const httpOptions = this.authService.getOptions();
        const userId = JSON.parse(sessionStorage.getItem('currentUser')).id;
        return this.http.get(this.API.concat('tuiterapi/reviews/'.concat(userId)), httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }
}