import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { authService } from '../authService';
import { VacanciesService } from '../admin/vacancies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  title = 'LabourExchange';

  constructor(private userService: UserService, private cookieService: CookieService, private router: Router, private authService: authService, private vacanciesService: VacanciesService) { 
    this.authService.getUserName().subscribe(result =>{
      this.user_name = result.text;
    });
    this.authService.getToken().subscribe(result =>{
      this.token = result.text;
    });

    this.vacanciesService.getDT().subscribe(result =>{
      if (result.token){
        this.cookieService.set('dropbox_token', result.token);
      }
    });
  }

  user_name:any;
  token:any;

  ngOnInit() {
    this.authService.sendToken(this.cookieService.get('token'));
    this.authService.sendUserName(this.cookieService.get('user_name'));
    console.log('user name: ' + this.user_name);
    console.log('token: ' + this.token);
  }

  logout(){
    this.userService.logout().subscribe(result => {      
        console.log(result.message);
        this.authService.clearMessage();      
        this.router.navigateByUrl('/home');    
    });
  }
}
