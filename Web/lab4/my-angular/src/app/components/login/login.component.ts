import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})

export class LoginComponent {
  loginForm!: FormGroup;
  summ!: number;

  constructor(private router: Router, private loginService: LoginService) {}

  submitLogin() {
    this.loginService.login(this.loginForm.value);
  }

  sum(a: number, b: number){
    this.summ = a+b;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)])
    })

    //if(this.authService.isLoggedIn()) {
      //this.router.navigate(['admin']);
    //}
  }

}
