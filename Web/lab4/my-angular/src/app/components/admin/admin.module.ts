import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminUserListComponent } from './components/admin-user-list/admin-user-list.component';
import { UserTableElementComponent } from './components/user-table-element/user-table-element.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AdminUserListComponent,
    UserTableElementComponent,
    EditUserComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule
    ]
})
export class AdminModule { }
