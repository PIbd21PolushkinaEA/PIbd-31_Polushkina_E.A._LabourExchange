import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {VacanciesService} from '../admin/vacancies.service';

@Component({
  selector: 'app-webhook',
  templateUrl: './webhook.component.html',
  styleUrls: ['./webhook.component.less']
})
export class WebhookComponent implements OnInit {

  constructor(private vacanciesService: VacanciesService) {
    this.observable_message.subscribe(val => {
      if (this.messages){
        this.messages.push(val);
        console.log(this.messages);
      }

      let message = JSON.parse(val).object.body.split(',');
        console.log(message);
        if (message[0] == 'Вакансия'){
          let d = {id: null, position: message[1], description: message[2], salary: message[3], images: [], images_files: []};
          this.vacanciesService.addVacancy(d).subscribe(result => {
            if (result.status == '201') {
              console.log("Vacancy added successfully: ", result.list);              
            }
          });
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
