import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UpdatePassComponent } from './update-pass/update-pass.component';
import { AuthGuardService } from './auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { WorkstationComponent } from './workstation/workstation.component';
import { EssayCardComponent } from './essay-card/essay-card.component';
import { ReviewEssay } from './review-essay/review-essay.component';
import { EssayComponent } from './essay/essay.component';

const routes: Routes = [
  { path: '', component: HomeComponent , pathMatch: 'full'},
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'update-pass', component: UpdatePassComponent, canActivate: [AuthGuardService] },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuardService]},
  { path: 'myessays', component: WorkstationComponent, canActivate: [AuthGuardService]},
  { path: 'to-review', component: EssayComponent},
  { path: 'review', component: ReviewEssay},
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
