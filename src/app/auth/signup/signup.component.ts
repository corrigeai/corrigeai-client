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
      'name': [null, 
                [Validators.required,
                 Validators.maxLength(100)]],
      'email': [null, 
                [Validators.required,
                 Validators.email]],
      'username': [null, 
                   [Validators.required,
                    Validators.pattern('^(?!.*[-_]{2,})(?=^[^0-9])(?=^[^-_].*[^-_]$)[\\w\\s-]{0,}$'),
                    Validators.minLength(4),
                    Validators.maxLength(15)]],
      'password': [null, 
                   [Validators.required,
                    Validators.minLength(6),
                    Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d^a-zA-Z0-9].{0,}$')]],
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
