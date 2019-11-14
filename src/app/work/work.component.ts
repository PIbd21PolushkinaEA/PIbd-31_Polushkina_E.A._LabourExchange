import { Component, OnInit } from '@angular/core';
import {Vacancy, Images} from '../admin/vacancy'
import {VacanciesService} from '../admin/vacancies.service'
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.less']
})
export class WorkComponent implements OnInit {

  constructor(private vacanciesService: VacanciesService) {
     
    this.observable.pipe(debounceTime(1000))
    .subscribe(val =>{
      this.vacanciesService.getResult(val).subscribe(result => {
        console.log("res ", result.list);
        this.vacancies = result.list;
      });
    });

    this.observable_id.subscribe(val => {
      if (this.vacancies){
        this.deleteVacancy(val);
      }
    });

    this.observable_vacancy.subscribe(val =>{
      if (this.vacancies){
        this.addVacancy(val);
      }
    });

  }

  vacancies: Vacancy[];

  observable = new Subject<string>()
  text:string;
  
  observable_id = new Subject<Number>();
  observable_vacancy = new Subject<any>();
  

  ngOnInit() {
    this.vacanciesService.getVacancies().subscribe(vacancies => {
      this.vacancies = vacancies.list;
      
      for (let vacancy of vacancies.list) {
        for (let image of vacancy.images){        
          this.vacanciesService.getImage(image.original).subscribe(res => {
            if (res.link){
              image.original = res.link;
            }
          });       
        }}

      console.log(this.vacancies);
    })

    var socket = new WebSocket("wss://labourexchangewebsocket.herokuapp.com");

    let vacancy = this.observable_vacancy
    let id = this.observable_id;

    socket.onmessage = function(event) {     
      process(event.data);
    };

    function process(data){
      if (Number(data)){
        id.next(Number(data));
      }
      else {
        vacancy.next(JSON.parse(data));
      }
    };
  }
  
  change(value: string){
    this.observable.next(value);
    console.log("dsfs: " + value);
  }

  deleteVacancy(id: Number){
    for(var i = 0; i < this.vacancies.length; i++) {
    if (this.vacancies[i].id == id){
      this.vacancies.splice(i,1);
      }
    };
    console.log(this.vacancies);
  }

  addVacancy(data: any){
    console.log(data);
    let vacancy = {id: data.id, position: data.position, description: data.description, salary: data.salary, images: [], images_files: []};
    if (!(this.vacancies.some(vac => vac === vacancy))){
      this.vacancies.push(vacancy);
    }
  }
}
