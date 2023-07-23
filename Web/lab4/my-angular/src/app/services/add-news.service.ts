import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {News} from "../interfaces/news";

@Injectable({
  providedIn: 'root'
})
export class AddNewsService {
  news!: News;
  constructor(private http: HttpClient) { }

  AddNews(temp_content: string, temp_user_id: string): Observable<string>{
    this.news = {id: "0", user_id: temp_user_id, content: temp_content}
    //let newsData = {id: "0", user_id: temp_user_id, content: temp_content}
    //console.log(this.news)
    return this.http.post<string>(`http://localhost:3000/add_news_submit`, this.news)
    //return this.http.post<string>(`http://localhost:3000/edit_user/1`, this.news)

  }
}
