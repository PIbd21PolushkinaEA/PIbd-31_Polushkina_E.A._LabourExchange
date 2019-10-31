import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../user'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'LabourExchange';
  constructor(private userService: UserService, private cookieService: CookieService, private router: Router) { }

  user_name:String = this.cookieService.get('user_name');

  ngOnInit() {
    console.log('user name: ' + this.cookieService.get('user_name'));
    console.log('token: ' + this.cookieService.get('token'));
  }

  logout(){
    this.userService.logout().subscribe(result => {      
        console.log(result.message);
        this.cookieService.delete('token');
        this.cookieService.delete('user_name');        
        this.router.navigateByUrl('/home');    
    });
  }
}
