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
    })
  }

  vacancies: Vacancy[];

  text: string;

  observable = new Subject<string>()


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
  }
  
  change(value: string){
    this.observable.next(value);
    console.log("dsfs: " + value);
  }
}
