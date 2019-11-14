import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-webhook',
  templateUrl: './webhook.component.html',
  styleUrls: ['./webhook.component.less']
})
export class WebhookComponent implements OnInit {

  constructor() {
    this.observable_message.subscribe(val => {
      if (this.messages){
        this.messages.push(val);
        console.log(this.messages);
      }
    });
   }

  messages: string[] = [];
  observable_message = new Subject<string>();

  ngOnInit() {

    var socket = new WebSocket("wss://labourexchangewebsocket.herokuapp.com");

    let mess = this.observable_message;

    socket.onmessage = function(event) {     
      mess.next(event.data);
    };
  }

}
