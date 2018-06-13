import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import {isUndefined} from "util";
import {getResponseURL} from "@angular/http/src/http_utils";
import {ngModuleJitUrl} from "@angular/compiler";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  show = true;
  inHome = true;

  constructor(private router: Router,
    private authService: AuthenticationService) {
    console.log()
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
    }else{
      this.router.navigate(['/']);
    }
  }


}
