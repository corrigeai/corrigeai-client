import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Review } from "../../models/review";
import { ReviewService } from "../services/review.service";

import {isUndefined} from "util";


@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
    review: Review = new Review("","",['','',' ','',''],[0,0,0,0,0]);
    reviewId: string;

    constructor(private  reviewService: ReviewService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params) => {
              this.reviewId = params['id'];
            }
          );

        this.reviewService.getReviewsAboutUser()
        .subscribe(
            (result) => {
                this.reviewService.setReviewCollection(
                    result.map(function(item) {return item.review}));
                if (!isUndefined(this.reviewId)) {
                    this.review = this.reviewService.getReviewByAttribute('id', this.reviewId);
                }
            }
        );
    }

    onRateReview() {
        this.reviewService.ratingDisplayed.emit(this.review);
    }
}
