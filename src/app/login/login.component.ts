import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  constructor(private userService: UserService, private cookieService: CookieService, private router: Router) { }

  user: User = { name: null, email: null, password: null };

  login(){
    this.userService.login(this.user).subscribe(result => {
      if (result.status == '200') {
        this.cookieService.set('token', result.list.token);
        this.cookieService.set('user_name', result.list.user_name);
        console.log(this.cookieService.get('user_name'));
      }      
    });
    this.router.navigateByUrl('/work');   
  }

}
