import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
// Import Services
import {StateService} from './services/state.service'

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
import { AuthService } from './services/auth.service';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    StateService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
