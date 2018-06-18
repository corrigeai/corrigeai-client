import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isLogged;
  private flag: boolean;

  constructor(private router: Router,
    private authService: AuthenticationService,
    private notificationService: NotificationService) {
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

  onQualquer() {
    this.flag = !this.flag;
    console.log(this.flag);

    if (!this.flag) {
      this.notificationService.viewUserNotifications().subscribe(
        notifications => {
          this.notificationService.setNotificationCollection(notifications);
          this.notificationService.notifyNotificationCollectionChanged();
        });
    }
  }

  onLogout (): void {
    this.authService.logOut();
    this.notificationService.disconnect();
    this.isLogged = false;
    this.router.navigate(['/']);
  }
}
