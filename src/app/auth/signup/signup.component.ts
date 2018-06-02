import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewEncapsulation} from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { CustomValidators } from '../../shared/custom-validators';

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
      'email': [null, 
                [Validators.required,
                 Validators.email]],
      'username': [null, 
                   [Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_-]*$'),
                    Validators.minLength(4)]],
      'password': [null, 
                   [Validators.required,
                    Validators.minLength(6)]],
      'confirmPassword': [null, 
                           [Validators.required, 
                            Validators.minLength(6)]],
      'gender': [null, Validators.required],
    },{
      validator: CustomValidators.Match('password', 'confirmPassword')
    });
  }

  submitForm(form: any): void {
    delete form.confirmPassword;

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
