import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: String;
  gender: String;
  email: String;
  username: String;

  constructor() {}

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.name = userInfo.name;
    this.gender = userInfo.gender;
    this.email = userInfo.email;
    this.username = userInfo.username;
  }

}
