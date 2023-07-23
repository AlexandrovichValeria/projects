import { Component } from '@angular/core';
import {User} from "../../../../interfaces/user";
import {map, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {News} from "../../../../interfaces/news";
import {HttpClient} from "@angular/common/http";
import {io} from "socket.io-client";
import {LoginService} from "../../../../services/login.service";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.less']
})

export class TimelineComponent {
  user!: User;
  news!: News[];
  img_dir!: string;
  socket!: any;
  constructor(private http: HttpClient, private loginService: LoginService){}

  getNewsById(id: string){
    return this.http.get<News[]>(`http://localhost:3000/get_news?id=${id}`)
  }

  exit(){
    this.loginService.logout()
  }

  ngOnInit(): void {
    this.socket = io('http://localhost:3000')
    let user_info = localStorage.getItem('user');
    if (user_info) {
      this.user = JSON.parse(user_info)
    }
    this.getNewsById(this.user.id).subscribe({
      next: (news) => {
        this.news = news;
      },
      error: (e) => console.error(e),
      //complete: () => console.info('complete')
    })
    this.img_dir = "/assets/photos/" + this.user.id + ".jpg"

    this.socket.on('receive-news', (news_content: string, user_id: string) => {
      if (this.user.friends.find(friend => friend === user_id) || this.user.id === user_id) {

        this.news.push({id: "0", user_id: user_id, content: news_content})
      }
  })
  }
}

//module.exports = 'exit'
