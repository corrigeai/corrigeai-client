import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() isLogged;
  private flag: boolean;

  constructor(private router: Router,
    private authService: AuthenticationService) {
      this.flag = false;

      this.authService.isLoggedIn()
      .subscribe(
        (result) => {
          this.isLogged = result;
        }
      );

    }

    ngOnInit() {
      this.authService.userHasLoggedIn.subscribe(
        () => {
          this.isLogged = true;
        }
      );
    }
}
