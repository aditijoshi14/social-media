import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FeedComponent } from './components/feed/feed.component';
import { PostComponent } from './components/post/post.component';
import { SignInPageComponent } from './views/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './views/sign-up-page/sign-up-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    NavBarComponent,
    SignUpComponent,
    FeedComponent,
    PostComponent,
    SignInPageComponent,
    SignUpPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
