import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { UpdatePassComponent } from './auth/update-pass/update-pass.component';
import { AuthGuardService } from './auth-guard.service';
import { ProfileComponent } from './user/profile/profile.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { WorkstationComponent } from './workstation/workstation.component';
import { EssayCardComponent } from './essay/essay-card/essay-card.component';
import { ReviewEssay } from './essay/review-essay/review-essay.component';
import { EssayComponent } from './essay/essay.component';
import { NotFoundPageComponent } from './auth/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent , pathMatch: 'full'},
  { path: 'signup', component: SignupComponent },
  { path: 'update-pass', component: UpdatePassComponent, canActivate: [AuthGuardService] },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuardService]},
  { path: 'myessays', component: WorkstationComponent, canActivate: [AuthGuardService]},
  { path: 'to-review', component: EssayComponent, canActivate: [AuthGuardService]},
  { path: 'review/:id', component: ReviewEssay, canActivate: [AuthGuardService]},

  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
