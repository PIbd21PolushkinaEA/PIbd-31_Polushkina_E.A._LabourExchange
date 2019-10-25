import { Component, OnInit } from '@angular/core';
import {Vacancy, Images} from '../admin/vacancy'
import {VacanciesService} from '../admin/vacancies.service'

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.less']
})
export class WorkComponent implements OnInit {

  constructor(private vacanciesService: VacanciesService) { }

  vacancies: Vacancy[];

  ngOnInit() {
    this.vacanciesService.getVacancies().subscribe(vacancies => {
      this.vacancies = vacancies.list;
      console.log(this.vacancies);
    })
  }
}
