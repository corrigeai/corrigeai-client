import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { ErrorService } from './error.service';
import { Review } from '../../models/review';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class ReviewService {

    ratingDisplayed = new EventEmitter<any>();
    checkReview = new EventEmitter<Review>();
    private reviewsCollection: any[] = [];
    API = environment.apiUrl;

    constructor(private http: HttpClient,
        private authService: AuthenticationService,
        private errorService: ErrorService) {}

    // reviewsCollection related Methods

    updateReviewElement(original: Review, newReview: Review): void {
        const index = this.reviewsCollection.indexOf(original);
        this.reviewsCollection[index] = newReview;
    }

    addReviewElement(review: Review): void {
        this.reviewsCollection.push(review);
    }

    setReviewCollection(ReviewCollection: Review[]): void {
        this.reviewsCollection = ReviewCollection;
    }

    getReviewCollection(): Review[] {
        return this.reviewsCollection;
    }

    getReviewByIndex(index: number): Review {
        return this.getReviewCollection()[index];
    }

    getReviewByAttribute(key: any, value: any): Review {
        const size = this.getReviewCollection().length;
        let result: Review;
        if (size < 1) {
            result = null;
        } else {
            for (let i = 0; i < this.getReviewCollection().length; i++) {
                if (this.getReviewCollection()[i][key] === value) {
                    result = this.getReviewCollection()[i];
                    break;
                }
            }
        }
        return result;
    }


    // HTTP related Methods

    updateReview(reviewData, reviewId): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.put(this.API.concat('reviews/'.concat(reviewId)), reviewData, httpOptions)
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

    rateReview(ratingData): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.post(this.API.concat('tuiterapi/reviews/rating/'), ratingData, httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            this.errorService.handleError(error);
            return  Observable.throw(error);
          });
    }
}
