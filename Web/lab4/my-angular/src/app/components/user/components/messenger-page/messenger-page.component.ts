import { Component } from '@angular/core';
import {User} from "../../../../interfaces/user";
import {Message} from "../../../../interfaces/message";
import {io} from "socket.io-client";

@Component({
  selector: 'app-messenger-page',
  templateUrl: './messenger-page.component.html',
  styleUrls: ['./messenger-page.component.less']
})

export class MessengerPageComponent {
  curUser!: User;
  companyUser!: User;
  Messages!: Message[];
  socket!: any;

  gnOnInit(): void{
    this.socket = io('http://localhost:3000')
  }
}
