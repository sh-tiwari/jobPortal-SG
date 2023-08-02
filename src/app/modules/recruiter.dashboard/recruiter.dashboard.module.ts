import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecruiterDashboardRoute } from './recruiter.dashboard.routing';

import { RecruiterDashboardComponent } from '../recruiter.dashboard/recruiter.dashboard.component';
import { AngularMaterialModule } from './angular-material.module';
import { PostJobComponent } from './post-job/post-job.component';

@NgModule({
    declarations: [
   
    RecruiterDashboardComponent,
    PostJobComponent
     
     
    ],
    imports: [
      CommonModule,
      RouterModule.forChild(RecruiterDashboardRoute),
      AngularMaterialModule
    
    ]
  })
  export class RecruiterDashboardModule { }