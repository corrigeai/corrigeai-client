import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UpdatePassComponent } from './update-pass/update-pass.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './auth-guard.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';


import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WorkstationComponent } from './workstation/workstation.component';
import {CreateEssayComponent} from './create-essay/create-essay.component';
import { EssayCardComponent } from './essay-card/essay-card.component';
import { EssayService } from './services/essay.service';
import { EditEssayComponent } from './edit-essay/edit-essay.component';
import { ReviewEssay } from './review-essay/review-essay.component';
import { DeleteEssayComponent } from './delete-essay/delete-essay.component';

// Loading environment
import { environment } from '../environments/environment';
import { ReviewService } from './services/review.service';
import { ReviewStationComponent } from './reviewstation/reviewstation.component';
import { EssayComponent } from './essay/essay.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HeaderComponent,
    ReviewEssay,
    HomeComponent,
    LoginComponent,
    DropdownDirective,
    ProfileComponent,
    EditProfileComponent,
    UpdatePassComponent,
    ReviewStationComponent,
    NavbarComponent,
    WorkstationComponent,
    EssayComponent,
    CreateEssayComponent,
    EditEssayComponent,
    EssayCardComponent,
    DeleteEssayComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {provide: 'API', useValue: environment.apiUrl},
    AuthenticationService,
    AuthGuardService,
    UserService,
    EssayService,
    ReviewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
