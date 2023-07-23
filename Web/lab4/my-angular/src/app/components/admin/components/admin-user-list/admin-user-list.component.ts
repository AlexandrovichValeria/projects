import { Component } from '@angular/core';
import {News} from "../../../../interfaces/news";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../../interfaces/user";
import {LoginService} from "../../../../services/login.service";

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.less']
})
export class AdminUserListComponent {
  user_list!: User[];
  constructor(private http: HttpClient, private loginService: LoginService){}
  getUsers(){
    return this.http.get<User[]>(`http://localhost:3000/get_users`)
  }

  exit(){
    this.loginService.logout()
  }
  ngOnInit(): void {
    this.getUsers().subscribe({
      next:(users) =>{
        this.user_list = users;
      }
    })
    //console.log(this.user_list)
    //this.user_list = this.getUsers();
  }
}
