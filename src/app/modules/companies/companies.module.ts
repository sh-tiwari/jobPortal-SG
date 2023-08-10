import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { TranslocoModule } from '@ngneat/transloco';
import { RouterModule } from '@angular/router';
//import { AlertModule } from 'ngx-bootstrap/alert';
//import { SharedModule } from 'src/app/shared/shared.module';
import { CompaniesComponent } from './companies.component';
import { CompaniesRoute } from './companies.routing';
import { AngularMaterialModule } from './angular-material.module';


@NgModule({
    declarations: [
      CompaniesComponent
    ],
    schemas: [
      NO_ERRORS_SCHEMA
    ],
    imports: [
      CommonModule,
      FormsModule,
      //TranslocoModule,
     // AlertModule.forRoot(),
      ReactiveFormsModule,    
      RouterModule.forChild(CompaniesRoute),
      AngularMaterialModule
    ]
  
})
export class CompaniesModule { }