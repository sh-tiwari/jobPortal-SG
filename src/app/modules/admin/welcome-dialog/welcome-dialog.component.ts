import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-dialog',
  template: '<h1>Hello User</h1> <button mat-button (click)="closeDialog()">Close</button>',
  styleUrls: ['./welcome-dialog.component.scss']
})
export class WelcomeDialogComponent {
  constructor(private dialogRef: MatDialogRef<WelcomeDialogComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}