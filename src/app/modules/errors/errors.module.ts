import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorsComponent } from './errors.component';
import { ErrorsRouting } from './errors.routing';

@NgModule({
  declarations: [ErrorsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ErrorsRouting)
    
    ]
})
export class ErrorModule { }
