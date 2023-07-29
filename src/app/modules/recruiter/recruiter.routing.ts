import { Routes } from '@angular/router';
import { RecruiterComponent } from './recruiter.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

export const RecruiterRoute: Routes = [
  {
    path: '',
    component: RecruiterComponent,
    children: [
      {
        path: 'signup',
        pathMatch: 'full',
        component: SignUpPageComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: LoginPageComponent,
      },
      // Add more child routes if needed...
    ],
  },
];