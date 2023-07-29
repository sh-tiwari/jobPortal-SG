import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruiterRoute } from './recruiter.routing';
import { RouterModule } from '@angular/router';
import { RecruiterComponent } from './recruiter.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { LoginPageComponent } from './login-page/login-page.component';


@NgModule({
  declarations: [
    RecruiterComponent,
    SignUpPageComponent,
    LoginPageComponent,
    
    
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
  ]
})




export class RecruiterModule { }
