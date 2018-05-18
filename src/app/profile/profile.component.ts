import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


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

  constructor(private router: Router) {}

  ngOnInit() {
  
      const user = JSON.parse(localStorage.getItem('currentUser'));      
      this.name = user.name;
      this.gender = user.gender;
      this.email = user.email;
      this.username = user.username;  
  }

  onEditProfile() {
    this.router.navigate(['edit-profile']);
    
  }

}
