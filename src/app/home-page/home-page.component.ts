import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  imagePath: SafeResourceUrl;
  username: String = "dummy_user";
  name: String = "Dummy name";
  email: String = "test@test.com";

  constructor(private router: Router,private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.username = user.username;
    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(user.photoUrl);
    this.name = user.name;
    this.email = user.email;
  }

  goToMyEssays(){
    this.router.navigate(['myessays']);
  }

  goToReview(){
    this.router.navigate(['to-review']);
  }

  goToMyProfile(){
    this.router.navigate(['profile']);
  }

  goToUpdatePass(){
    this.router.navigate(['update-pass']);
  }



}
