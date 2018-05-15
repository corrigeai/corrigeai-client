import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';

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
      'email': [null, Validators.required],
      'password': [null, Validators.required],
    });
  }

  submitForm(form: any): void {
    this.authService.login(form)
    .subscribe(
      data => {
          let info = data;
          delete info.token;
          delete info.id;

          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.id);
          localStorage.setItem('userInfo', info);

          this.router.navigate(['/']);
          this.error = undefined;
          this.loginForm.reset();      
        },
      error => this.error = error
    );
  }

}
