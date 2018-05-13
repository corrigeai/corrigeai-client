import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';

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
      'old-pass': [null, Validators.required],
      'email': [null, Validators.required],
      'new-pass': [null, Validators.required],
      'confirm-new-pass': [null, Validators.required],
    });

    console.log(this.updatePassForm);
  }

  submitForm(form: any): void {
    
  }
}
