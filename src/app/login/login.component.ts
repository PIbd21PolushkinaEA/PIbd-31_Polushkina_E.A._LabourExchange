import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router';
import { authService } from '../authService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  constructor(private userService: UserService, private cookieService: CookieService, private router: Router, private authService: authService) { }

  user: User = { name: null, email: null, password: null };

  login(){
    this.userService.login(this.user).subscribe(result => {
      if (result.status == '200') {
        this.authService.sendToken(result.list.token);
        this.authService.sendUserName(result.list.user_name);
      }      
    });
  this.router.navigateByUrl('/work');   
  }
  
  loginFB(){
    this.userService.loginFB().subscribe(result => {
      console.log(result);            
      window.location.href = result;        
    });  
  }
}
