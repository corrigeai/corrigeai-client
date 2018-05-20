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
      'photoUrl': [user.photoUrl],
      'gender': [user.gender, Validators.required],
      'username': [user.username, 
                   [Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_-]*$'),
                     Validators.minLength(4)]]
      });
  }

  ngOnInit() {
  }

  submitForm(form: any): void {
    this.userService.editUser(form)
    .subscribe(
      result => {
        if (result) {
          this.router.navigate(['profile']);
          this.error = undefined;
          this.editProfileForm.reset();
        }
      },
      error => this.error = error
    );
  }

}
