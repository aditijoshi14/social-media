import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInPageComponent } from './views/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './views/sign-up-page/sign-up-page.component';
import { FeedPageComponent } from './views/feed-page/feed-page.component';
import { ProfilePageComponent } from './views/profile-page/profile-page.component';
import { PostService } from './services/post.service';
import { UserProfilePageComponent } from './views/user-profile-page/user-profile-page.component';
import { AuthInfoService } from './services/authInfo.service';
import { RedirectAuthService } from './services/redirectAuth.service';

const signInState = {
  path: '', 
  component: SignInPageComponent,
  canActivate: [RedirectAuthService]
}

const signUpState = {
  path: 'register', 
  component: SignUpPageComponent
}

const feedState = {
  path: 'feed', 
  component: FeedPageComponent,
  canActivate: [AuthInfoService]
}

const profileState = {
  path: 'profile', 
  component: ProfilePageComponent,
  canActivate: [AuthInfoService]
}

const userProfile = {
  path: 'u/:userId',
  component: UserProfilePageComponent,
  canActivate: [AuthInfoService]
}

const routes: Routes = [
  signInState,
  signUpState,
  feedState,
  profileState,
  userProfile
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}




