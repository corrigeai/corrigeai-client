import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isLogged;

  constructor(private router: Router,
    private authService: AuthenticationService) {
     
    }

    ngOnInit() {
      this.authService.userHasLoggedIn.subscribe(
        () => {
          this.isLogged = true;
        }
      );
    }

  onLogout (): void {
    this.authService.logOut();
    this.isLogged = false;
    this.router.navigate(['/']);
  }
}
