import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './modules/companies/companies.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { AdminHomeComponent } from './modules/admin-home/admin-home.component';
import { NoAuthGuard } from './core/auth/guards/no-auth.guard';
import { CandidateModule } from './modules/candidates/candidates.module';
import { CandidateAuthGuard } from './core/auth/guards/candidate-auth.guard';
import { RecruiterAuthGuard } from './core/auth/guards/recruiter-auth.guard';
import { RecruiterNoAuthGuard } from './core/auth/guards/recruiter-no-auth.guard';


const routes: Routes = [
  { path: 'signed-in-admin-redirect', pathMatch : 'full', redirectTo: 'admin-dashboard' },
  { path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'dashboard' },
  { path: 'signed-in-recruiter-redirect', pathMatch : 'full', redirectTo: 'recruiter-dashboard' },


  { path:'', pathMatch:'full', redirectTo: 'home' },
  {
    path: 'home', loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path:'dashboard',canActivate: [CandidateAuthGuard],loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path:'recruiter',
    canActivate:[RecruiterNoAuthGuard],
     loadChildren: () => import('./modules/recruiter/recruiter.module').then(m => m.RecruiterModule) 
  },

  {
    path:'recruiter-dashboard',
    canActivate:[RecruiterAuthGuard],
    loadChildren: () => import('./modules/recruiter.dashboard/recruiter.dashboard.module').then(m => m.RecruiterDashboardModule)
  },
  // Admin routes

  { path:'admin',canActivate:[NoAuthGuard], component:AdminHomeComponent},
  {
    path: 'admin-dashboard',
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)}
    ]
  },
  {
    path: 'candidates',
    //canActivate: [AuthGuard],
    //component: CandidatesComponent,
    /* data: {
      role: ['user', 'admin']
    }, */
     children: [
      { path: '', loadChildren: () => import('./modules/candidates/candidates.module').then(m => CandidateModule)}
    ] 
  },
  {
    path: 'companies',
    //canActivate: [AuthGuard],
    component: CompaniesComponent,
    /* data: {
      role: ['user', 'admin']
    },
    children: [
      { path: '', loadChildren: () => import('./modules/comapny/company.module').then(m => m.CompanyModule)}
    ] */
  },

  {
    path: 'jobs',
    //canActivate: [AuthGuard],
    //component: JobsComponent,
    /* data: {
      role: ['user','admin']
    },*/
    children: [
      { path: '', loadChildren: () => import('./modules/jobs/jobs.module').then(m => m.JobsModule)}
    ] 
  },
  //Not-found route
  {path: '404-not-found', pathMatch: 'full',loadChildren: () => import('./modules/errors/errors.module').then(m => m.ErrorModule)},
  {path: '**', redirectTo: '404-not-found'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
