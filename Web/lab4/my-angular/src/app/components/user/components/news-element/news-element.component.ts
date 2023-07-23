import {Component, Input} from '@angular/core';
import {User} from "../../../../interfaces/user";
import {News} from "../../../../interfaces/news";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-news-element',
  templateUrl: './news-element.component.html',
  styleUrls: ['./news-element.component.less']
})
export class NewsElementComponent {
  @Input() news!: News;
  //@Input() user!: User;
  img_dir!: string;
  news_user!: User;

  constructor(private http: HttpClient) {}

  getUserById(id: string){
    return this.http.get<User>(`http://localhost:3000/get_user_by_id?id=${id}`)
  }
  ngOnInit(): void {

    this.getUserById(this.news.user_id).subscribe({
      next: (user) =>{
        this.news_user = user;
      },
      //error: (e) => console.error(e),
    })
    this.img_dir = "/assets/photos/" + this.news.user_id + ".jpg"
    //console.log(this.img_dir)
  }
}
