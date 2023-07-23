import { Injectable } from '@angular/core';
import {User} from "../interfaces/user";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  curUser!: User;
  //isAdmin!: boolean;
  constructor(private router: Router, private http: HttpClient) {
    //this.isAdmin = false;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken();
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['login']);
    this.setToken("")
  }

  getUserInfoByEmail(userData: {email: string, password: string}){
    return this.http.get<User>(`http://localhost:3000/user_check?email=${userData.email}&password=${userData.password}`)
  }

  /*ngOnInit(): void {
    let usr = localStorage.getItem('user')
    console.log("aaaaaa")
    console.log(usr)
  }*/

  login(userData: {email: string, password: string}){

    this.getUserInfoByEmail(userData).subscribe({
      next: (user) => {
        this.curUser = user;
        //console.log(this.curUser)
        localStorage.setItem('user', JSON.stringify(this.curUser));
        if (this.curUser.role === "Администратор") {
          //this.isAdmin = true;
          console.log("qwerty")
          this.setToken("aaadddmmmiiinnn")
          this.router.navigate(['admin'])
        }
        else {
          this.setToken("uuussseeerrr")
          let link = "user/timeline"
          this.router.navigate([link])
        }
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }

  logOut(){
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
