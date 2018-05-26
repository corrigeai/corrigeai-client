import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from "@angular/core";

import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { Review } from "../models/review";

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReviewService {

    private reviewsCollection: any[];

    API = environment.apiUrl;

    constructor(private http: HttpClient,private authService: AuthenticationService) {}

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

    createReview(reviewData): Observable<any> {
        const httpOptions = this.authService.getOptions();
        return this.http.post(this.API.concat('tuiterapi/reviews'), reviewData, httpOptions)
        .map((response: Response) => response)
        .catch((error: Response) => {
            return  Observable.throw(error);
          });
    }

}