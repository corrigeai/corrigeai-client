import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent implements OnInit {

  editProfileForm: FormGroup;
  error: any;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService
  ) {
    this.editProfileForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'photoUrl': [null, Validators.required],
      'gender': [null, Validators.required],
      'username': [null, Validators.required]
      })
  }

  ngOnInit() {
  }

  submitForm(form: any): void {
    this.userService.editUser(form)
    .subscribe(
      result => {
        if (result) {
          this.router.navigate(['/']);
          this.error = undefined;
          this.editProfileForm.reset();
        }
      },
      error => this.error = error
    );
  }

}
