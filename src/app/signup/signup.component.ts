import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.signUpForm = formBuilder.group({
      'name': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.required],
    });
  }

  submitForm(form: any): void {
    console.log(form);
  }

}
