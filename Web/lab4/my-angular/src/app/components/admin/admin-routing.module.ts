import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminUserListComponent} from "./components/admin-user-list/admin-user-list.component";
import {EditUserComponent} from "./components/edit-user/edit-user.component";
import {AdminGuard} from "../../guards/admin.guard";

const routes: Routes = [
  {path: "", component: AdminUserListComponent},
  {
    path: "edit_user/:num([0-9]{1,})",
    component: EditUserComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
