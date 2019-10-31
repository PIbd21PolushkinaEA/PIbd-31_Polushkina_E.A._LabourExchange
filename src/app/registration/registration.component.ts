import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent {

  constructor(private userService: UserService, private cookieService: CookieService, private router: Router) { }

  user: User = { name: null, email: null, password: null };

  register(){
    this.userService.register(this.user).subscribe(result => {
      if (result.status == '200') {
        console.log(result.message);
        this.cookieService.set('token', result.list.token)
        this.cookieService.set('user_name', result.list.user_name);
        console.log(this.cookieService.get('user_name'));
      }      
    });
    this.router.navigateByUrl('/work');
  }

}
