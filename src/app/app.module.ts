import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { AuthenticationService } from './services/authentication.service';

// Loading environment
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: 'API', useValue: environment.BASE_URL},
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
