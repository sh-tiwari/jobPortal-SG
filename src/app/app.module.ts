import { AngularMaterialModule } from './angular-material.module';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './core/auth/interceptor'; */
import { AuthService } from './core/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminHomeComponent } from './modules/admin-home/admin-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompaniesComponent } from './modules/companies/companies.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';




@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    CompaniesComponent,
    DashboardComponent
    
    
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [
    /* {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }, */
      AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
