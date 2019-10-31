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

    //link: string = 'https://labourexchangebackend.herokuapp.com/';

    getVacancies(): Observable<any>{
        return this.http
        .get('api/vacancies',this.options)
        .pipe(catchError(this.handleError('getVacancies')))
    }

    getVacancy(id: number): Observable<any> {
        const url = 'api/vacancies/' + id;
        return this.http
            .get(url, this.options)
            .pipe(catchError(this.handleError('getVacancy', id)))
    }

    addVacancy(vacancy: Vacancy): Observable<any>{
        return this.http
        .post('api/vacancies', vacancy, this.options)
        .pipe(catchError(this.handleError('addVacancy', vacancy)))
    }

    deleteVacancy(id: number): Observable<any>{
        const url = 'api/vacancies/'+id;
        return this.http
        .delete(url, this.options)
        .pipe(catchError(this.handleError('deleteVacancy',id)))
    }

    updateVacancy(vacancy: Vacancy): Observable<any>{        
        const url = 'api/vacancies/' + vacancy.id;
        return this.http
            .put(url, vacancy, this.options)
            .pipe(catchError(this.handleError('updateVacancy', vacancy)))
    }
}