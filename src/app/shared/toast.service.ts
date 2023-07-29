import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar:MatSnackBar) { }

  /**
   * It takes three parameters
   * 1) the message string
   * 2) the action
   * 3) the type
   * 4) the duration, alignment, etc.
  */
  showToast(message: string, action: string, type: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: [type,'toaster','toaster_bottom_right' ],
    });
  };
}
