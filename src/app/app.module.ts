import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { NgxPayPalModule } from 'ngx-paypal';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ErrorComponent } from './errors/error.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { NotFoundPageComponent } from './auth/not-found/not-found.component';
import { NotificationComponent } from './notification/notification.component';
import { TopicComponent } from './topic/topic.component';
import { ReviewStationComponent } from './reviewstation/reviewstation.component';
import { NotificationCardComponent } from './notification/card/notification-card.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// User related components
import { ProfileComponent } from './user/profile/profile.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WorkstationComponent } from './workstation/workstation.component';

// Payment
import { PaymentComponent } from './user/payment/payment.component';

// Authorization related components
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UpdatePassComponent } from './auth/update-pass/update-pass.component';

// Essay related components
import { EssayComponent } from './essay/essay.component';
import { ReviewEssay } from './essay/review-essay/review-essay.component';
import { EssayCardComponent } from './essay/essay-card/essay-card.component';
import { EditEssayComponent } from './essay/edit-essay/edit-essay.component';
import {CreateEssayComponent} from './essay/create-essay/create-essay.component';
import { DeleteEssayComponent } from './essay/delete-essay/delete-essay.component';
import { EssaysStatusComponent } from './essay/essays-status/essays-status.component';

// Review related components
import { ReviewComponent } from './review/review.component';
import { RateReviewComponent } from './review/rate-review/rate-review.component';

// Services
import { UserService } from './services/user.service';
import { ErrorService } from './services/error.service';
import { EssayService } from './services/essay.service';
import { AuthGuardService } from './auth-guard.service';
import { TopicService } from './services/topic.service';
import { ReviewService } from './services/review.service';
import { BadgesService } from './services/badges.service';
import { RatingService } from './services/rating.service';
import { NotificationService } from './services/notification.service';
import { AuthenticationService } from './services/authentication.service';
import { PaymentService } from './services/payment.service';

// Loading environment
import { environment } from '../environments/environment';

// Third party
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {StompConfig, StompService} from '@stomp/ng2-stompjs';
import * as SockJS from 'sockjs-client';

const API = environment.apiUrl;
const entrypoint = API.concat('notifications/ws');

const stompConfig = {
  url: new SockJS(entrypoint),
  headers: {},
  heartbeat_in: 0,
  heartbeat_out: 20000,
  reconnect_delay: 5000,
  debug: true
};

@NgModule({
  declarations: [
    ReviewEssay,
    AppComponent,
    HomeComponent,
    EssayComponent,
    LoginComponent,
    ErrorComponent,
    SignupComponent,
    NavbarComponent,
    HeaderComponent,
    ReviewComponent,
    ProfileComponent,
    DropdownDirective,
    EditEssayComponent,
    EssayCardComponent,
    UpdatePassComponent,
    RateReviewComponent,
    CreateEssayComponent,
    EditProfileComponent,
    WorkstationComponent,
    DeleteEssayComponent,
    EssaysStatusComponent,
    NotFoundPageComponent,
    NotificationComponent,
    ReviewStationComponent,
    NotificationCardComponent,
    TopicComponent,
    DashboardComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgxPayPalModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  providers: [
    UserService,
    EssayService,
    ErrorService,
    TopicService,
    ReviewService,
    BadgesService,
    RatingService,
    AuthGuardService,
    NotificationService,
    PaymentService,
    StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    },
    AuthenticationService,
    {provide: 'API', useValue: environment.apiUrl}
  ],
  exports: [
    ErrorComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
