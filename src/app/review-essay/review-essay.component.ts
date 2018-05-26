import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-review-essay',
    templateUrl: './review-essay.component.html',
    styleUrls: ['review-essay.component.scss']
})
export class ReviewEssay {
    reviewForm: FormGroup;
  
    constructor(
      private formBuilder: FormBuilder,
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

    submitForm(form: any): void {
      }
}