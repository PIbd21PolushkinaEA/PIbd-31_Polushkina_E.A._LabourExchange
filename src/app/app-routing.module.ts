import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { isAuthorized } from './isAuthorized'

import { AppComponent } from './header/app.component';
import { WorkComponent } from './work/work.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AddComponent } from './admin/add/add.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { InfoComponent } from './info/info.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [isAuthorized]},
  { path: 'admin/add', component: AddComponent, canActivate: [isAuthorized] },
  { path: 'admin/edit/:id', component: AddComponent , data:{mode:"edit"}, canActivate: [isAuthorized]},
  { path: 'work', component: WorkComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegistrationComponent }, 
  //{ path: 'work', loadChildren: './work/work.module#WorkModule' },
  { path: 'info', component: InfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
