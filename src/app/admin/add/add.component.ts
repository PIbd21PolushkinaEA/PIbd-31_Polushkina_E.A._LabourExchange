import { Component, OnInit } from '@angular/core';
import {Vacancy} from '../vacancy';
import {VacanciesService} from '../vacancies.service'
import {Router, ActivatedRoute} from '@angular/router'

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {

  public Editor = ClassicEditor;

  constructor(private vacanciesService: VacanciesService, private route: ActivatedRoute, private router: Router) { }
  vacancy: Vacancy = { id: null, position: null, description: null, salary: null , images:[], images_files: []};
  id: string;
  
  createOrupdate() {
    if (this.route.snapshot.data['mode'] == "edit") {
      this.updateVacancy(this.vacancy);
    }
    else {
      this.addVacancy(this.vacancy);
    }
    this.router.navigateByUrl('/admin');
  }

  updateVacancy(vacancy: Vacancy) {
    this.vacanciesService.updateVacancy(vacancy).subscribe(result => {
      if (result.status == '201') {

        console.log("Vacancy updated successfully: ", result.vacancy.fio)
        this.vacanciesService.addImages(vacancy, result.vacancy.id, 'edit').subscribe(result => {
          console.log("Images added successfully: ", result.list)
        });
      }
    });
  }

  addVacancy(vacancy: Vacancy) {
    this.vacanciesService.addVacancy(vacancy).subscribe(result => {
      if (result.status == '201') {
        console.log("Vacancy added successfully: ", result.list)
        this.vacanciesService.addImages(vacancy, result.list, 'add').subscribe(result => {
          console.log("Images added successfully: ", result.list)
        });
      }
    });
  }

  addImage() {
    this.vacancy.images.push({ id: null, original: "", small: null, vacancy_id: this.vacancy.id });
  }

  delImage(i: number) {
    this.vacancy.images.splice(i, 1);
  }

  ngOnInit() {
    console.log(this.route.snapshot);
    this.vacancy.id = this.route.snapshot.params['id'] * 1;
    this.vacanciesService.getVacancy(this.vacancy.id).subscribe(result => {   
      if (result.status == '200') {
      this.vacancy.position = result.list.position;
      this.vacancy.description = result.list.description;
      this.vacancy.salary = result.list.salary;
      this.vacancy.images = result.list.images;
      }
    });
  }

  handleFileInput(files: FileList) {    
    this.vacancy.images_files.push(files.item(0));    
  console.log("files ", this.vacancy.images_files);
}
}