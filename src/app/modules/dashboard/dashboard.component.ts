import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Job, JobBasicData, JobBasicDatas } from 'src/app/core/models/job.model';
import { JobsService } from 'src/app/core/services/job.service';
import { ToastService } from 'src/app/shared/toast.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;
  page = {
    filter: "",
    status: "",
    type:""
    // sort: -1,
  };

  jobsData: Job[] | any;

  jobsListTableColumns: string[] = [ 'jobTitle', 'companyName','salary','city', 'action'];
  data: MatTableDataSource<any> = new MatTableDataSource();
  

  constructor(
    private _jobsService: JobsService,
    private _authService :AuthService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _toasterService: ToastService,
    private _snackBar: MatSnackBar,
    private _router:Router

  ){}

  ngOnInit(): void {
    this.fetchAll()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.data.paginator = this._paginator;
      this.data.sort = this._sort;
      this.data.sortingDataAccessor = (item, property) => {
        switch (property) {
          default: return item[property];
        }
      }
    }, 500);
    // Mark for check
    this._changeDetectorRef.markForCheck();
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

  fetchAllJobs(): any {
    this._jobsService.fetchAllJobs().subscribe((response: JobBasicDatas) => {
      // Get the users
      this.jobsData = response.data || [];

      // Assign it to data of table
      this.data.data = this.jobsData;

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }

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

  typeFilter(event: MatSelectChange): void {
    const selectedValue = event.value; 
  
    // Now you can use the selectedValue as needed
    this.page.type = selectedValue;
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
