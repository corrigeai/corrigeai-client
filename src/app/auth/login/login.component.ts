import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

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

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.router.navigate(['/home']);
    }
  }

  submitForm(form: any): void {
    this.authService.login(form)
    .subscribe(
      (data) => {
          sessionStorage.setItem('token', JSON.stringify(data.token));
          sessionStorage.setItem('currentUser', JSON.stringify(data.user));
          this.router.navigate(['/home']);
          this.loginForm.reset();
          this.authService.notifyUserLogIn();
        }
    );
  }

}
