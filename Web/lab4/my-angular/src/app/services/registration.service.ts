import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  newUser!: User;
  constructor(private http: HttpClient) { }

  //getUserInfoByEmail(userData: {email: string, name: string, date_of_birth: string, password: string}){
    //return this.http.get<User>(`http://localhost:3000/user_check?email=${userData.email}&password=${userData.password}`)
  //}

  registration(userData: {email: string, name: string, date_of_birth: string, password: string}): Observable<string>{
    console.log(userData.date_of_birth)
    return this.http.post<string>(`http://localhost:3000/add_user`, userData)
  }
}
