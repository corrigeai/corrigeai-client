
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {ProfileComponent} from "./profile/profile.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {path: 'profile', component: ProfileComponent},
  {path: 'edit-profile', component: EditProfileComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
