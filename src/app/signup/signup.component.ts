import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewEncapsulation} from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'], 
   encapsulation: ViewEncapsulation.None
})
export class SignupComponent {
  signUpForm: FormGroup;
  error: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.signUpForm = formBuilder.group({
      'name': [null, Validators.required],
      'email': [null, Validators.required],
      'username': [null, Validators.required],
      'password': [null, Validators.required],
      'gender': [null, Validators.required],
    });
  }

  submitForm(form: any): void {
    this.authService.signUp(form)
      .subscribe(
        result => {
          if (result) {
            this.router.navigate(['login']);
            this.error = undefined;
            this.signUpForm.reset();
          }
        },
        error => this.error = error
      );
  }

}
