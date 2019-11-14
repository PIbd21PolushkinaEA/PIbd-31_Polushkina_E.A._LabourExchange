import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import {HttpHeaders} from '@angular/common/http'

import {Observable} from 'rxjs'
import {catchError} from 'rxjs/operators'

import {Vacancy} from './vacancy'
import {HttpErrorHandler, HandleError } from '../http-error-handler.service'
import { CookieService } from 'ngx-cookie-service'

@Injectable()
export class VacanciesService{
    private handleError: HandleError

    constructor(private http: HttpClient, httpErrorHandler:HttpErrorHandler, private cookieService: CookieService){
        this.handleError = httpErrorHandler.createHandleError ('VacanciesService')
    }
    
    options = {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get('token'))
      };

      dropbox = {
        headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.cookieService.get('dropbox_token'),
        'Content-Type': 'application/json'
    })};

    link: string = 'https://labourexchangebackend.herokuapp.com/';

    getVacancies(): Observable<any>{
        return this.http
        //.get('api/vacancies',this.options)
        .get(this.link + 'api/vacancies',this.options)
        .pipe(catchError(this.handleError('getVacancies')))
    }

    getVacancy(id: number): Observable<any> {
        const url = 'api/vacancies/' + id;
        return this.http
            //.get(url, this.options)
            .get(this.link + url, this.options)
            .pipe(catchError(this.handleError('getVacancy', id)))
    }

    addVacancy(vacancy: Vacancy): Observable<any>{
        return this.http
        //.post('api/vacancies', vacancy, this.options)
        .post(this.link + 'api/vacancies', vacancy, this.options)
        .pipe(catchError(this.handleError('addVacancy', vacancy)));
    }

    deleteVacancy(id: number): Observable<any>{
        const url = 'api/vacancies/'+id;
        return this.http
        //.delete(url, this.options)
        .delete(this.link + url, this.options)
        .pipe(catchError(this.handleError('deleteVacancy',id)))
    }

    updateVacancy(vacancy: Vacancy): Observable<any>{        
        const url = 'api/vacancies/' + vacancy.id;
        return this.http
            //.put(url, vacancy, this.options)
            .put(this.link + url, vacancy, this.options)
            .pipe(catchError(this.handleError('updateVacancy', vacancy)))
    }

    addImages(vacancy: Vacancy, id: string, mode: string) : Observable<any> {
        const formData: FormData = new FormData();
        const id_json = JSON.stringify(id); 
        const mode_json = JSON.stringify(mode); 
        const vacancy_id = new Blob([id_json], {
              type: 'application/json'
        });        
        const img_mode = new Blob([mode_json], {
              type: 'application/json'
        });
        formData.append(id, vacancy_id);
        formData.append(mode, img_mode);
        for(var i = 0; i < vacancy.images_files.length; i++){ 
            formData.append('images_files_'+i, vacancy.images_files[i]);
        }
        return this.http
            //.post('api/upload_to_dropbox', formData, this.options)
            .post(this.link + 'api/upload_to_dropbox', formData, this.options)
            .pipe(catchError(this.handleError('addImages', formData)));
    }

    getImage(path: string) : Observable<any>{
        const data: any = { 
            "path": path
        };

        return this.http
            .post('https://api.dropboxapi.com/2/files/get_temporary_link', <JSON>data, this.dropbox)
            .pipe(catchError(this.handleError('getImage', <JSON>data)));
    }

    getResult(text: string): Observable<any>{
        const data: any = { 
            "text": text
        };
        
        return this.http
        //.post('api/search', <JSON>data, this.options)
        .post(this.link + 'api/searchby', <JSON>data, this.options)
        .pipe(catchError(this.handleError('getResult', text)));
    }
    
    getDT(): Observable<any>{
        return this.http
        //.get('api/dropbox', this.options)
        .get(this.link + 'api/dropbox', this.options)
        .pipe(catchError(this.handleError('getDropboxToken')));
    }
}