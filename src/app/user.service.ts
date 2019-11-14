import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { User } from './user'
import { HttpErrorHandler, HandleError } from './http-error-handler.service'
import { CookieService } from 'ngx-cookie-service'

@Injectable()
export class UserService {
    private handleError: HandleError

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler, private cookieService: CookieService) {
        this.handleError = httpErrorHandler.createHandleError('DoctorsService')
    }

    link: string = 'https://labourexchangebackend.herokuapp.com/';

    options = {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get('token'))
      };

    register(user: User): Observable<any> {
        return this.http
            //.post('api/register', user)
            .post(this.link + 'api/register', user)
            .pipe(catchError(this.handleError('register', user)))
    }

    login(user: User): Observable<any> {
        return this.http
            //.post('api/login', user)
            .post(this.link + 'api/login', user)
            .pipe(catchError(this.handleError('login', user)))
    }

    logout(): Observable<any> {
        return this.http
            //.post('api/logout', this.options)
            .post(this.link + 'api/logout', this.options)
            .pipe(catchError(this.handleError('logout')))
    }

    loginFB(): Observable<any> {
        return this.http
            //.get('api/login/facebook')
            .get(this.link + 'api/login/facebook')
            .pipe(catchError(this.handleError('loginFB')))
    }

    getAuth(): Observable<any> {
        return this.http
            //.get('api/login/facebook/getAuth')
            .get(this.link + 'api/login/facebook/getAuth')
            .pipe(catchError(this.handleError('getAuth')))
    }
}