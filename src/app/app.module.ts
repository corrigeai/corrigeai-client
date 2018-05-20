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

// Loading environment
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WorkstationComponent } from './workstation/workstation.component';
import {CreateEssayComponent} from './create-essay/create-essay.component';
import { EssayCardComponent } from './essay-card/essay-card.component';
import { EssayService } from './services/essay.service';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    DropdownDirective,
    ProfileComponent,
    EditProfileComponent,
    UpdatePassComponent,
    NavbarComponent,
    WorkstationComponent,
    CreateEssayComponent,
    EssayCardComponent

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
    EssayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
