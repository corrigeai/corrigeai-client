import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { SignupComponent } from './signup/signup.component';
import { AuthenticationService } from './services/authentication.service';

// Loading environment
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {provide: 'API', useValue: environment.apiUrl},
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
