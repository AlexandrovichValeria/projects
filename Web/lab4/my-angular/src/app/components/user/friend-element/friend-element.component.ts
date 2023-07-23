import {Component, Input} from '@angular/core';
import {User} from "../../../interfaces/user";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-friend-element',
  templateUrl: './friend-element.component.html',
  styleUrls: ['./friend-element.component.less']
})
export class FriendElementComponent {
  @Input() user!: User;
  @Input() main_user!: User;
  img_dir!: string;
  constructor(private http: HttpClient){
    //this.img_dir = "/assets/photos/" + this.user.id + ".jpg"
    //console.log(this.img_dir)
  }

  callDelete(){
    return this.http.post<string>(`http://localhost:3000/delete_friend`, {friend_id: this.user.id, user: this.main_user})

  }
  deleteFriend(){
    console.log("asdasdsadasds")
    this.callDelete().subscribe({
      next: () => {

        let index = this.main_user.friends.indexOf(this.user.id);
        if (index !== -1) {
          this.main_user.friends.splice(index, 1);
        }
        localStorage.setItem('user', JSON.stringify(this.main_user))
        location.reload()
      }
    })
    /*let index = this.main_user.friends.indexOf(this.user.id);
    if (index !== -1) {
      this.main_user.friends.splice(index, 1);
    }*/

  }

  ngOnInit(): void {
    this.img_dir = "/assets/photos/" + this.user.id + ".jpg"
    //console.log(this.img_dir)
  }
}
