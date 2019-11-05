import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { authService } from '../authService';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.less']
})
export class InfoComponent implements OnInit {

  constructor(private cookieService: CookieService, private userService: UserService, private router: Router, private authService: authService) { }

  ngOnInit() {
    this.userService.getAuth().subscribe(result =>{
      if (result.status = 200){
        this.authService.sendToken(result.list.token);
        this.authService.sendUserName(result.list.user_name);
      }
    });
  }
}
