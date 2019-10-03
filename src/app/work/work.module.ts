import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkComponent } from './work.component';

export const ROUTES: Routes = [
    { path: '', component: WorkComponent, pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    declarations: [WorkComponent]
})
export class WorkModule { }