import { Component, OnInit } from '@angular/core';
import {Vacancy, Images} from './vacancy'
import {VacanciesService} from './vacancies.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  constructor(private vacanciesService: VacanciesService, private router: Router) { }
  vacancies: Vacancy[];

  deleteVacancy(id: number) {
    this.vacanciesService.deleteVacancy(id).subscribe(status => {
      if (status == '204') {
        console.log("Vacancy deleted successfully: ", id)
      }
    });
    //location.reload();
  }

  getVacancy(id: number) {
    this.vacanciesService.getVacancy(id).subscribe(result => {
      console.log(result.list.position);
    });
  }

  ngOnInit() {
    this.vacanciesService.getVacancies().subscribe((vacancies)=>{
      this.vacancies = vacancies.list;
      console.log(this.vacancies);
    })
  }

  ngOnChanges(){
    this.ngOnInit();
  }
}
