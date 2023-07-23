import { Component } from '@angular/core';
import {User} from "../../../../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {News} from "../../../../interfaces/news";

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.less']
})
export class FriendListComponent {
  curUser!: User;
  friend_list!: User[];
  all_users!: User[];

  constructor(private http: HttpClient){}

  getUsers(){
    return this.http.get<User[]>(`http://localhost:3000/get_users`)
  }
  findFriends(){
    if (this.all_users) {
      for (let user of this.all_users){
        if (this.curUser.friends.includes(user.id)){
          console.log(user.id)
          this.friend_list.push(user)
        }
        //console.log(user)
      }
      //console.log(this.curUser.friends)
      //for (let user of this.all_users){
        //console.log(user)
      //}
    }
  }

  ngOnInit(): void{
    this.friend_list = []
    //console.log("adassasd")
    let user_info = localStorage.getItem('user');
    if (user_info) {
      this.curUser = JSON.parse(user_info)
    }
    this.getUsers().subscribe({
      next: (users) =>{
        this.all_users = users;
      },
      error: (e) => console.error(e),
      complete:() => this.findFriends()
    })
    //console.log(this.all_users)


  }
}
