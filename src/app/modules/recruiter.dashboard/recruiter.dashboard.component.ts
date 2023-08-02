import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { JobBasic, JobBasicData } from 'src/app/core/models/job.model';
import { JobsService } from 'src/app/core/services/job.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-recruiter.dashboard',
  templateUrl: './recruiter.dashboard.component.html',
  styleUrls: ['./recruiter.dashboard.component.scss']
})
export class RecruiterDashboardComponent  implements OnInit{
  
  //dashboard parameter
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  page = {
    filter: "",
    status: ""
    // sort: -1,
  };

  jobsData: JobBasic[] | any;

  jobsListTableColumns: string[] = [ 'jobTitle', 'companyName','salary', 'action'];
  data: MatTableDataSource<any> = new MatTableDataSource();

  totalUsers: number = 0;

  
  //Sidebar toggle show hide function
  status = false;
  
  addToggle()
  {
    this.status = !this.status;       
  }
  
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private _router:Router,
    private _authService:AuthService,
    private _toasterService: ToastService,
    private _jobsService: JobsService,
    private _changeDetectorRef: ChangeDetectorRef
    ){
  //get request from web api
    this.http.get('').subscribe(data => {
      //this.data = data;
    
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


  fetchAll() {
    this._jobsService.fetchAll(this.page).subscribe((response: JobBasicData) => {
      // Get the users
      this.jobsData = response.data || [];

      // Assign it to data of table
      this.data.data = this.jobsData;

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  };

 /*  fetchAllJobs(): any {
    this._jobsService.fetchAllJobs().subscribe((response: JobBasicDatas) => {
      // Get the users
      this.jobsData = response.data || [];

      // Assign it to data of table
      this.data.data = this.jobsData;

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  } */

  searchUser(event: any) {
    this.page.filter = event.target.value;
    this.fetchAll();
  }

  statusFilter(event: MatSelectChange): void {
    const selectedValue = event.value; 
  
    // Now you can use the selectedValue as needed
    this.page.status = selectedValue;
    this.fetchAll();
  }

  deleteFn(id: string): void {
    if (confirm("Are you sure to delete ?")) {
      this._jobsService.delete(id).subscribe(response => {
        this._toasterService.showToast('Deleted Successfully', '', 'success');
        this.fetchAll();
      });
    }
  };

  trackByFn(index: number, item: any): any {
    return item._id || index;
  }
}


