import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs';
import { CookieService } from 'ngx-cookie-service'

@Injectable()
export class authService {
    constructor(private cookieService: CookieService){    }
    private token = new Subject<any>();

    private user_name = new Subject<any>();

    sendToken(message: string): void {
        this.token.next({ text: message });
        this.cookieService.set('token', message);        
    }

    sendUserName(message: string): void {
        this.user_name.next({ text: message });
        this.cookieService.set('user_name', message);
    }

    clearMessage(): void {
        this.token.next({text:""});
        this.user_name.next({text:""});
        this.cookieService.deleteAll();
    }

    getToken(): Observable<any> {
        return this.token.asObservable();
    }

    getUserName(): Observable<any> {
        return this.user_name.asObservable();
    }
} 