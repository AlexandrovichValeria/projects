import { Injectable } from '@angular/core';
import {User} from "../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserEditService {
  curUser!: User;
  newUser!: User;
  constructor(private http: HttpClient) { }
  getUserById(id: string){
    return this.http.get<User>(`http://localhost:3000/get_user_by_id?id=${id}`)
  }

  finishEdit(id: string, userData: {name: string, date_of_birth: string, email: string, role: string, status: string}){
    if (userData.role === "") {
      userData.role = this.curUser.role;
    }
    if (userData.status === "")
      userData.status = this.curUser.status;

  }

  submitEdit(id: string, userData: {name: string, date_of_birth: string, email: string, role: string, status: string}): Observable<string>{
    this.getUserById(id).subscribe({
      next: (user) => {
        this.curUser = user;
      },
      error: (e) => console.error(e),
    })

    this.finishEdit(id, userData)
    return this.http.post<string>(`http://localhost:3000/edit_user/${id}`, userData)
  }
}
