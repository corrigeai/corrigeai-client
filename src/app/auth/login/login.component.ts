import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.loginForm = formBuilder.group({
      'identifier': [null, Validators.required],
      'password': [null,
        [Validators.required,
         Validators.minLength(6),
         Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d^a-zA-Z0-9].{0,}$')]
      ],
    });
  }

  submitForm(form: any): void {
    this.authService.login(form)
    .subscribe(
      (data) => {
          localStorage.setItem('token', JSON.stringify(data.token));
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          this.router.navigate(['/']);
          this.error = undefined;
          this.loginForm.reset();      
        },
      (error) => this.error = error
    );
  }

}
