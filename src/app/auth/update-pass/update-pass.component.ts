import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';
import { CustomValidators } from '../../shared/custom-validators';

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
      'oldPassword': [null, 
          [Validators.required,
           Validators.minLength(6),
           Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d^a-zA-Z0-9].{0,}$')]],
      'newPassword': [null, 
          [Validators.required,
           Validators.minLength(6),
           Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d^a-zA-Z0-9].{0,}$')]],
      'confirmPassword': [null, [Validators.required, Validators.minLength(6)]],
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
