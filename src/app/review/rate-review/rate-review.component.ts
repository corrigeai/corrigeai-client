import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RatingService } from '../../services/rating.service';
import { Review } from '../../../models/review';

@Component({
    selector: 'app-rate-review',
    templateUrl: './rate-review.component.html',
    styleUrls: ['./rate-review.component.scss']
})
export class RateReviewComponent implements OnInit {
    review: Review;
    loginForm: FormGroup;
    display = 'none';
    thumbs = 1;

    constructor(
        private reviewService: ReviewService,
        private ratingService: RatingService,
        private formBuilder: FormBuilder) {

    this.loginForm = formBuilder.group({
        'comment': [null,
            [Validators.required,
            Validators.minLength(6)]
        ],
        });
    }

    ngOnInit() {
        this.reviewService.ratingDisplayed
        .subscribe(
            (review: Review) => {
              this.display = 'block';
              this.review = review;
              console.log(this.review);
            });
    }

    submitForm(form: any): void {
      if (this.thumbs === 1) {
        form['approved'] = 'Upvote';
      } else {
        form['approved'] = 'Downvote';
      }

       let rating = {
         'userId': JSON.parse(sessionStorage.getItem('currentUser')).id,
         'reviewId': this.review.id,
         'vote': form.approved,
         'comment': form.comment
       };

       this.ratingService.createRating(rating)
       .subscribe(
        (data) => {
            this.thumbs = 1;
            this.loginForm.reset();
            this.onCloseRating();
          }
      );
    }

    toggleThumbs() {
        this.thumbs = this.thumbs * -1  ;
        console.log(this.thumbs);
    }

    onCloseRating() {
        this.display = 'none';
    }
}
