import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { TranslocoModule } from '@ngneat/transloco';
import { RouterModule } from '@angular/router';
//import { AlertModule } from 'ngx-bootstrap/alert';
//import { SharedModule } from 'src/app/shared/shared.module';
import { CandidatesComponent } from './candidates.component';
import { CandidatesRoute } from './candidates.routing';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AngularMaterialModule } from './angular-material.module';

@NgModule({
  declarations: [
    CandidatesComponent,
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
    RouterModule.forChild(CandidatesRoute),
    //SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,  
    MatIconModule,
    MatDividerModule,
    MatButtonModule, 
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    AngularMaterialModule
  ]
  
})
export class CandidateModule { }
