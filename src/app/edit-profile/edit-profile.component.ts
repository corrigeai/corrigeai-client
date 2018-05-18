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
    const user = JSON.parse(localStorage.getItem('currentUser'));

    this.editProfileForm = this.formBuilder.group({
      'name': [user.name, Validators.required],
      'photoUrl': [user.photo_url, Validators.required],
      'gender': [user.gender, Validators.required],
      'requester': [user.username, Validators.required]
      })
  }

  ngOnInit() {
  }

  submitForm(form: any): void {
    console.log(form);
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
