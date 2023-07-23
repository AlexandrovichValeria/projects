import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from "./components/login/login.component";
import { RegistrationComponent } from './components/registration/registration.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {TimelineComponent} from "./components/user/components/timeline/timeline.component";
import { AddNewsComponent } from './components/user/components/add-news/add-news.component';
import { NewsElementComponent } from './components/user/components/news-element/news-element.component';
import { MessengerPageComponent } from './components/user/components/messenger-page/messenger-page.component';
import { FriendListComponent } from './components/user/components/friend-list/friend-list.component';
import { FriendElementComponent } from './components/user/friend-element/friend-element.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    TimelineComponent,
    AddNewsComponent,
    NewsElementComponent,
    MessengerPageComponent,
    FriendListComponent,
    FriendElementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
