import { Component } from '@angular/core';
import {User} from "../../../../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {UserEditService} from "../../../../services/user-edit.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.less']
})
export class EditUserComponent {
  userEditForm!: FormGroup;
  user!: User;
  constructor(private router: Router, private http: HttpClient, private userEditService: UserEditService){}

  getUserById(id: string){
    return this.http.get<User>(`http://localhost:3000/get_user_by_id?id=${id}`)
  }

  ngOnInit(): void {
    let id = window.location.pathname.split("/")[3]
    this.getUserById(id).subscribe({
      next: (user) =>{
        this.user = user;
      },
      error: (e) => console.error(e),
    })
    this.userEditForm = new FormGroup({
      'name': new FormControl(''),
      'date_of_birth': new FormControl(''),
      'email': new FormControl(''),
      'role': new FormControl(''),
      'status': new FormControl('')
    })
  }

  submitUserEdit(){
    this.userEditService.submitEdit(this.user.id, this.userEditForm.value).subscribe({
      next: () => this.router.navigate([`admin`]),
      error: (error) => console.log(error)
    })
    //console.log(this.userEditForm.value)
  }
}
