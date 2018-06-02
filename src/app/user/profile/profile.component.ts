import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


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

  constructor(private router: Router,private _sanitizer: DomSanitizer) {}

  ngOnInit() {
  
      const user = JSON.parse(localStorage.getItem('currentUser'));      
      this.name = user.name;
      this.gender = user.gender;
      this.email = user.email;
      this.username = user.username;  
      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(user.photoUrl);
      
  }

  onEditProfile() {
    this.router.navigate(['edit-profile']);
    
  }

}
