import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInPageComponent } from './views/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './views/sign-up-page/sign-up-page.component';
import { FeedPageComponent } from './views/feed-page/feed-page.component';
import { ProfilePageComponent } from './views/profile-page/profile-page.component';
import { PostService } from './services/post.service';
import { UserProfilePageComponent } from './views/user-profile-page/user-profile-page.component';

const signInState = {
  path: '', 
  component: SignInPageComponent
}

const signUpState = {
  path: 'register', 
  component: SignUpPageComponent
}

const feedState = {
  path: 'feed', 
  component: FeedPageComponent,
  controller: PostService,
}

const profileState = {
  path: 'profile', 
  component: ProfilePageComponent
}

const userProfile = {
  path: 'u/:username',
  component: UserProfilePageComponent
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




