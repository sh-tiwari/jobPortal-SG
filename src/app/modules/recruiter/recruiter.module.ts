import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecruiterRoute } from './recruiter.routing';
import { RecruiterLoginComponent } from './recruiter.login/recruiter.login.component';
import { RecruiterSignupComponent } from './recruiter.signup/recruiter.signup.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import {  MatTabsModule } from '@angular/material/tabs';
import { RecruiterHeaderComponent } from './recruiter-header/recruiter-header.component';
import { RecruiterFooterComponent } from './recruiter-footer/recruiter-footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatRippleModule} from '@angular/material/core';
import { RecruiterComponent } from './recruiter.component';


@NgModule({
    declarations: [
     RecruiterLoginComponent,
     RecruiterSignupComponent,
     RecruiterHeaderComponent,
     RecruiterFooterComponent,
     RecruiterComponent
     
     
    ],
    imports: [
      CommonModule,
      RouterModule.forChild(RecruiterRoute),
      MatIconModule,
      MatMenuModule,
      MatButtonModule,
      MatToolbarModule,
      MatCardModule,
      MatInputModule,
      FormsModule,
      MatProgressSpinnerModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      ReactiveFormsModule,
      MatTabsModule,
      MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule, 
    MatRippleModule,
    MatToolbarModule,
    
    
    ]
  })
  export class RecruiterModule { }