import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {TimelineComponent} from "./components/user/components/timeline/timeline.component";
import {AddNewsComponent} from "./components/user/components/add-news/add-news.component";
import {AdminGuard} from "./guards/admin.guard";
import {MessengerPageComponent} from "./components/user/components/messenger-page/messenger-page.component";
import {FriendListComponent} from "./components/user/components/friend-list/friend-list.component";
//import {UserListComponent} from "./components/user/components/user-list/user-list.component";

const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  //{path: 'user/:num([0-9]{1,})/timeline'}
  {path: 'user/timeline', component: TimelineComponent},
  {path: 'user/add_news', component: AddNewsComponent},
  {path: 'user/friend_list', component: FriendListComponent},
  //{path: 'user/messenger/:id([0-9]{1,})', component: MessengerPageComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./components/admin/admin.module').then((m) => m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
