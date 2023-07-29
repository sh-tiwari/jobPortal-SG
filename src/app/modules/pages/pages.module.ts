import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoute } from './pages.routing'
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
      PagesComponent,
      LandingPageComponent,
      HeaderComponent,
      FooterComponent,
      
    ],
  
    imports: [
      CommonModule,
      RouterModule.forChild(PagesRoute),
      MatButtonModule,
      MatSidenavModule,
      MatMenuModule,
      MatToolbarModule,
      MatIconModule,
      MatListModule,
      MatExpansionModule,
      MatTooltipModule,
      MatDialogModule,
      MatInputModule,
      MatCheckboxModule,
      FormsModule,
      ReactiveFormsModule
   
     
    ]
  })
  export class PagesModule { }