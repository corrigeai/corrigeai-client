import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm: FormGroup;
  error: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService) {

    this.signUpForm = formBuilder.group({
      'name': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.required],
    });
  }

  submitForm(form: any): void {
    this.authService.signUp(form)
      .subscribe(
        result => {
          if (result) {
            this.router.navigate(['/']);
            this.error = undefined;
            this.signUpForm.reset();
          }
        },
        error => this.error = error
      );
  }

}
