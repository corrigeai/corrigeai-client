import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { SignupComponent } from './signup/signup.component';
import { UpdatePassComponent } from './update-pass/update-pass.component';
import { AuthenticationService } from './services/authentication.service';

// Loading environment
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    UpdatePassComponent,
    LoginComponent
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
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
