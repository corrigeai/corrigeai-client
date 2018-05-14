import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

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
              private authService: AuthenticationService
  ) {
    this.editProfileForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'email': [null, Validators.required],
      'passwotd': [null, Validators.required]
      })
  }

  ngOnInit() {
  }

}
