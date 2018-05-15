import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit() {
  
    if (localStorage.getItem('userInfo') !== null) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      
      this.name = userInfo.name;
      this.gender = userInfo.gender;
      this.email = userInfo.email;
      this.username = userInfo.username;  
    }
  }

}
