import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../../../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {AddNewsService} from "../../../../services/add-news.service";
import {Router} from "@angular/router";
import {io} from "socket.io-client";

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.less']
})
export class AddNewsComponent {
  addNewsForm!: FormGroup;
  user_id!: string;

  socket!: any;
  //curUser!: User;
  constructor(private router: Router, private http: HttpClient, private addNewsService: AddNewsService) {
  }
  getUserById(id: string){
    return this.http.get<User>(`http://localhost:3000/get_user_by_id?id=${id}`)
  }
  submitNews(){
    this.addNewsService.AddNews(this.addNewsForm.value.news_content, this.user_id).subscribe({
      next: () => this.router.navigate([`user/timeline`]),
      error: (error) => console.log(error)
    })

    this.socket.emit('send-news', this.addNewsForm.value.news_content, this.user_id)
  }

  ngOnInit(): void {
    this.socket = io('http://localhost:3000')

    this.addNewsForm = new FormGroup({
      'news_content': new FormControl('')
    })
    let user_info = localStorage.getItem('user');

    if (user_info) {
      this.user_id = JSON.parse(user_info).id
    }
  }
}
