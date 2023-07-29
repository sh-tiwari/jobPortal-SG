import { Component , OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  

  isToggle = false;
  constructor(
    private _authService :AuthService,
    private _router:Router,
    private dialog: MatDialog,    
    private snackBar: MatSnackBar,
      
  ) {}
   

  ngOnInit(): void {
    this.openDialog();
  }

  toggle() {
    this.isToggle = !this.isToggle;
  }
  logOut(){
    this._authService.signOut().subscribe(response=>{
      this.showSnackBar('Logout Successful');
      this._router.navigate(['home']);
    });
    return true;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WelcomeDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end'; // Add this line
  verticalPosition: MatSnackBarVerticalPosition = 'bottom'; // Add this line

  // Method to show the snackbar
  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Set the duration for the snackbar to be displayed (in milliseconds)
      horizontalPosition: this.horizontalPosition, // Use the horizontal position
      verticalPosition: this.verticalPosition // Use the vertical position
    });
  }
}
