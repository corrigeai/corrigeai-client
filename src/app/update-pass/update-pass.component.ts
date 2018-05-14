import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';
import { CustomValidators } from '../shared/custom-validators';

@Component({
  selector: 'app-update-pass',
  templateUrl: './update-pass.component.html',
  styleUrls: ['./update-pass.component.scss']
})
export class UpdatePassComponent implements OnInit {
  updatePassForm: FormGroup;
  error: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {  
    this.updatePassForm = this.formBuilder.group({
      'oldPassword': [null, Validators.required],
      'email': [null, Validators.required],
      'newPassword': [null, Validators.required],
      'confirmPassword': [null, Validators.required],
    }, {
      validator: CustomValidators.Match('newPassword', 'confirmPassword')
    });

  }

  submitForm(form: any): void {
    delete form.confirmPassword;
    this.authService.updatePassword(form)
    .subscribe(
      result => {
        if (result) {
          this.router.navigate(['/']);
          this.error = undefined;
          this.updatePassForm.reset();
        }
      },
      error => this.error = error
    );
}

}
