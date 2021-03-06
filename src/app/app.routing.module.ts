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
import { ReviewEssayComponent } from './essay/review-essay/review-essay.component';
import { EssayComponent } from './essay/essay.component';
import { NotificationComponent } from './notification/notification.component';
import { NotFoundPageComponent } from './auth/not-found/not-found.component';
import { ReviewComponent } from './review/review.component';
import { TopicComponent } from './topic/topic.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent , pathMatch: 'full'},
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent , canActivate: [AuthGuardService]},
  { path: 'update-pass', component: UpdatePassComponent, canActivate: [AuthGuardService] },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuardService]},
  { path: 'myessays', component: WorkstationComponent, canActivate: [AuthGuardService]},
  { path: 'to-review', component: EssayComponent, canActivate: [AuthGuardService]},
  { path: 'notifications', component: NotificationComponent, canActivate: [AuthGuardService]},
  { path: 'prev-review/:id', component: ReviewComponent},
  { path: 'review/:id', component: ReviewEssayComponent, canActivate: [AuthGuardService]},
  { path: 'topic', component: TopicComponent, canActivate: [AuthGuardService]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},

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
