import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ReviewService } from '../services/review.service';
import { Review } from '../models/review';

@Component({
    selector: 'app-review-essay',
    templateUrl: './review-essay.component.html',
    styleUrls: ['review-essay.component.scss']
})
export class ReviewEssay {
  @Input() essayId;
  reviewForm: FormGroup;
  
    constructor(
      private formBuilder: FormBuilder,
      private reviewService: ReviewService,
      private router: Router
    ) {
      this.reviewForm = formBuilder.group({
        'comptc1text': [null, Validators.required],
        'comptc1nota': [0, Validators.required],
        'comptc2text': [null, Validators.required],
        'comptc2nota': [0, Validators.required],
        'comptc3text': [null, Validators.required],
        'comptc3nota': [0, Validators.required],
        'comptc4text': [null, Validators.required],
        'comptc4nota': [0, Validators.required],
        'comptc5text': [null, Validators.required],
        'comptc5nota': [0, Validators.required],
      });
    }

    complyForm(form: any): any {
      let submission = {};
      let comments: string[] = [];
      let ratings: number[] = [];
      const user = JSON.parse(localStorage.getItem('currentUser'));

      comments.push(
        form.comptc1text,
        form.comptc2text,
        form.comptc3text,
        form.comptc4text,
        form.comptc5text
      );
      ratings.push(
        form.comptc1nota,
        form.comptc2nota,
        form.comptc3nota,
        form.comptc4nota,
        form.comptc5nota);

        submission["id"] = this.essayId;
        submission["reviewingUserId"] = user.id;
        submission["comments"] = comments;
        submission["ratings"] = ratings;

        return submission;
    }

    submitForm(form: any): void {
      let submission = this.complyForm(form);

      this.reviewService.createReview(submission).subscribe(
        (review: Review) => {
          this.reviewService.addReviewElement(review);
          this.reviewForm.reset();
          this.router.navigate(['/']);
        }
      )
      }
}