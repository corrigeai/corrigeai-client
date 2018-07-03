import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: String = "Dummy name";
  gender: String = "Unknown";
  email: String = "test@test.com";
  username: String = "dummy_user";
  imagePath: SafeResourceUrl;
  editProfileForm: FormGroup;
  fileToUpload: File = null;
  error: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private _sanitizer: DomSanitizer
  ) {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(user.photoUrl);

    this.editProfileForm = this.formBuilder.group({
    'name': [user.name, Validators.required],
    'email': [user.email, Validators.required],
    'photoUrl': [user.photoUrl],
    'gender': [user.gender, Validators.required],
    'username': [user.username,
            [Validators.required,
              Validators.pattern('^[a-zA-Z0-9_-]*$'),
              Validators.minLength(4)]]
    });
  }

  ngOnInit() {

      const user = JSON.parse(sessionStorage.getItem('currentUser'));
      this.name = user.name;
      this.gender = user.gender;
      this.email = user.email;
      this.username = user.username;
      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(user.photoUrl);

  }

  onEditProfile() {
    this.router.navigate(['edit-profile']);

  }


  submitForm(form: any): void {
    this.userService.editUser(form)
    .subscribe(
      result => {
        if (result) {
          this.router.navigate(['profile']);
          this.error = undefined;
        }
      },
      error => this.error = error
    );
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imagePath = reader.result;
        this.editProfileForm.patchValue({
          photoUrl: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }
}
