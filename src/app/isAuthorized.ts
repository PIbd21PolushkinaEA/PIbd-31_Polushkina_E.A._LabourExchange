import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'
import { Observable } from "rxjs";

@Injectable()
export class isAuthorized implements CanActivate{

    constructor(private cookieService: CookieService, private router: Router) {
    }

    token:String = this.cookieService.get('token');

    canActivate() : Observable<boolean> | boolean{
        if (this.token){
        return true;
        }
        else { 
            this.router.navigate(['/home']);        
            return false;
        }
    } 
}