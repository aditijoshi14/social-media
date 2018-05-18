import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInPageComponent } from './views/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './views/sign-up-page/sign-up-page.component';
import { FeedPageComponent } from './views/feed-page/feed-page.component';

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
  component: FeedPageComponent
}

const routes: Routes = [
  signInState,
  signUpState,
  feedState
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}




