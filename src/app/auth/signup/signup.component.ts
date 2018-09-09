import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewEncapsulation, OnInit} from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CustomValidators } from '../../shared/custom-validators';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.signUpForm = this.formBuilder.group({
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
      'role': ['Free', [Validators.required]]
    }, {
      validator: CustomValidators.Match('password', 'confirmPassword')
    });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.router.navigate(['/home']);
    }
  }

  submitForm(form: any): void {
    delete form.confirmPassword;

    this.userService.createUser(form)
      .subscribe(
        result => {
          if (result) {
            this.router.navigate(['/']);
            this.signUpForm.reset();
          }
        }
      );
  }


  goBack() {
    this.router.navigate(['/']);
  }
}
