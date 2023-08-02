import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-recruiter.dashboard',
  templateUrl: './recruiter.dashboard.component.html',
  styleUrls: ['./recruiter.dashboard.component.scss']
})
export class RecruiterDashboardComponent  implements OnInit{
  
  //dashboard parameter


  totalUsers: number = 0;

  
  //Sidebar toggle show hide function
  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  data:any;
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private _router:Router,
    private _authService:AuthService
    ){
  //get request from web api
    this.http.get('').subscribe(data => {
      this.data = data;
    
          }, error => console.error(error));
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end'; // Add this line
  verticalPosition: MatSnackBarVerticalPosition = 'bottom'; // Add this line


  showSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000, // Set the duration for the snackbar to be displayed (in milliseconds)
      horizontalPosition: this.horizontalPosition, // Use the horizontal position
      verticalPosition: this.verticalPosition // Use the vertical position
    });
  }

  logOut(){
    this._authService.signOut().subscribe(response=>{
      this.showSnackBar('Logout Successful');
      this._router.navigate(['home']);
    });
    return true;
  }
}


