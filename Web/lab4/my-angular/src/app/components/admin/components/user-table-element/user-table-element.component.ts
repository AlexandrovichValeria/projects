import {Component, Input} from '@angular/core';
import {User} from "../../../../interfaces/user";

@Component({
  selector: 'app-user-table-element',
  templateUrl: './user-table-element.component.html',
  styleUrls: ['./user-table-element.component.less']
})
export class UserTableElementComponent {
  @Input() user!: User;
  img_dir!: string;
  constructor(){
    //this.img_dir = "/assets/photos/" + this.user.id + ".jpg"
    //console.log(this.img_dir)
  }

  ngOnInit(): void {
    this.img_dir = "/assets/photos/" + this.user.id + ".jpg"
    //console.log(this.img_dir)
  }
  openEditWindow(){

  }
}
