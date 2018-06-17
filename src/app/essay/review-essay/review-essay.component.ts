import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ReviewService } from '../../services/review.service';
import { Review } from '../../../models/review';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-review-essay',
  templateUrl: './review-essay.component.html',
  styleUrls: ['review-essay.component.scss']
})
export class ReviewEssay implements OnInit {
  reviewId: string;
  reviewForm: FormGroup;
  // private subscription: Subscription;
  
  
  constructor(
    private formBuilder: FormBuilder,
    private reviewService: ReviewService,
    private router: Router,
    private route: ActivatedRoute
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
  
  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.reviewId = params['id'];
      }
    );
  }
  
  complyForm(form: any): any {
    let submission = {};
    let comments: string[] = [];
    let ratings: number[] = [];
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    
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

      submission["reviewingUserId"] = user.id;
      submission["comments"] = comments;
      submission["ratings"] = ratings;
      return submission;
    }

    submitForm(form: any): void {
      let submission = this.complyForm(form);
      this.reviewService.updateReview(submission, this.reviewId).subscribe(
        (review: Review) => {
          this.reviewService.addReviewElement(review);
          this.reviewForm.reset();
          this.router.navigate(['profile']);
        }
      );
    }
  }