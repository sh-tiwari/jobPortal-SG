import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoute } from './dashboard.routing';
import { AngularMaterialModule } from './angular-material.module';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';


@NgModule({
    declarations: [
      DashboardComponent,
      AppliedJobsComponent
    ],
   
    imports: [
      CommonModule,
      FormsModule,
      //TranslocoModule,
     // AlertModule.forRoot(),
      ReactiveFormsModule,
      AngularMaterialModule,    
      RouterModule.forChild(DashboardRoute)
    ]
  
})
export class DashboardModule { }