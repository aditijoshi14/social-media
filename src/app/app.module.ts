import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { CookieModule } from 'ngx-cookie';
import { MomentModule } from 'ngx-moment';

// Import Services
import { StateService } from './services/state.service'
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';

// Import Components
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FeedComponent } from './components/feed/feed.component';
import { PostComponent } from './components/post/post.component';
import { SignInPageComponent } from './views/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './views/sign-up-page/sign-up-page.component';
import { FeedPageComponent } from './views/feed-page/feed-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfilePageComponent } from './views/profile-page/profile-page.component';
import { UserService } from './services/user.service';
import { FollowingComponent } from './components/profile-card/following/following.component';
import { FollowersComponent } from './components/profile-card/followers/followers.component';
import { PostsComponent } from './components/profile-card/posts/posts.component';
import { FollowComponent } from './components/follow/follow.component';
import { UserProfilePageComponent } from './views/user-profile-page/user-profile-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthInfoService } from './services/authInfo.service';
import { RedirectAuthService } from './services/redirectAuth.service';
import { UserFollowersComponent } from './components/user-profile-card/followers/userFollowers.component';
import { UserFollowingComponent } from './components/user-profile-card/following/userFollowing.component';
import { UserPostsComponent } from './components/user-profile-card/posts/userPosts.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    NavBarComponent,
    SignUpComponent,
    FeedComponent,
    PostComponent,
    SignInPageComponent,
    SignUpPageComponent,
    FeedPageComponent,
    ProfileComponent,
    ProfilePageComponent,
    FollowingComponent,
    FollowersComponent,
    PostsComponent,
    FollowComponent,
    UserProfilePageComponent,
    UserProfileComponent,
    UserFollowersComponent,
    UserFollowingComponent,
    UserPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    FormsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    LocalStorageModule.withConfig({
      prefix: 'social-media',
      storageType: 'localStorage'
    }),
    CookieModule.forRoot(),
    MomentModule
  ],
  providers: [
    StateService,
    AuthService,
    PostService,
    UserService,
    AuthInfoService,
    RedirectAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
