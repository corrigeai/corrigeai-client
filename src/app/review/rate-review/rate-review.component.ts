import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RatingService } from '../../services/rating.service';

@Component({
    selector: 'app-rate-review',
    templateUrl: './rate-review.component.html',
    styleUrls: ['./rate-review.component.scss']
})
export class RateReviewComponent implements OnInit {
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
            () => {
                this.display = 'block';
            });
    }

    submitForm(form: any): void {
       form['approved'] = this.thumbs;
       console.log(form);
       this.ratingService.createRating(form)
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
