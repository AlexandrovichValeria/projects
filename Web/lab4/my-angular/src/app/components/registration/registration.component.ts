import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegistrationService} from "../../services/registration.service";
import {User} from "../../interfaces/user";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent {
  regForm!: FormGroup;
  added_user!: User;
  id!: string;

  constructor(private http: HttpClient, private router: Router, private regService: RegistrationService, private loginService: LoginService) {}

  getUserById(){
    return this.http.get<User>(`http://localhost:3000/get_user_by_id?id=${this.id}`)
  }
  callLoginService(){
    let userData = {
      "email": this.added_user.email,
      "password": this.added_user.password
    }
    this.loginService.login(userData)
  }
  login(){
    this.getUserById().subscribe({
      next: (user) =>{
        this.added_user = user;
    },
      complete: () => this.callLoginService()
    })

  }

  submitReg(){

    //console.log(this.regForm.value)
    this.regService.registration(this.regForm.value).subscribe({
      next: (id_obj) =>{
        this.id = Object.values(id_obj)[0]
        this.id = (this.id).toString()
        console.log(this.id)
      },
      complete: () => this.login()
    })
  }

  ngOnInit(): void {
    this.regForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'date_of_birth': new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{2}([./-])\d{2}\1\d{4}$/)]),
      'password': new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)])
    })
  }
}
