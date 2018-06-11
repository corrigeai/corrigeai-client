import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import {isUndefined} from "util";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  show = true;
  inHome = false;

  constructor(private router: Router,
    private authService: AuthenticationService) {
  }

  onLogout (): void {
    this.show = true;
    this.authService.logOut();
    this.router.navigate(['/']);
  }

  isLogged(){
    if(isUndefined(localStorage.getItem('token')) || localStorage.getItem('token') != null) {
      this.show = false;
      return false;
    }else{
      this.show = true;
      return true;
    }
  }

  redirect(){
    this.isLogged();
    if(!this.show){
      this.router.navigate(['/home-page']);
      this.inHome = true;
    }else{
      this.router.navigate(['/']);
    }
  }
}
