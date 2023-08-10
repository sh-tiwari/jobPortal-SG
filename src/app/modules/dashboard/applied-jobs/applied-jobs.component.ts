import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Job } from 'src/app/core/models/job.model';
import { CandidateService } from 'src/app/core/services/candidate.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss']
})
export class AppliedJobsComponent implements OnInit{
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  


  jobsData: Job[] | any;

  jobsListTableColumns: string[] = [ 'jobTitle','companyName','salary', 'action'];
  data: MatTableDataSource<any> = new MatTableDataSource();
  

  constructor(
    private _candidateService: CandidateService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _toasterService: ToastService,
    private _snackBar: MatSnackBar,
    private _router: Router

  ){}

  ngOnInit(): void {
    
    this.getPostedJobs()
  }

  getPostedJobs() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this._candidateService.fetchAppliedJobs(currentUser._id).subscribe((response) => {
        this.jobsData = response;
        console.log(this.jobsData.data);
        this.data.data = this.jobsData.data;
        console.log(this.data.data);
      },
      (error) => {
        console.error('Error fetching applied jobs:', error);
        alert("Unable to fetch data");
      });
    }
  };

  /* fetchAllJobs(): any {
    this._jobsService.fetchAllJobs().subscribe((response: JobBasicDatas) => {
      // Get the users
      this.jobsData = response.data || [];

      // Assign it to data of table
      this.data.data = this.jobsData;

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  } */







  /* deleteFn(id: string): void {
    if (confirm("Are you sure to delete ?")) {
      this._jobsService.delete(id).subscribe(response => {
        this._toasterService.showToast('Deleted Successfully', '', 'success');
        this.getPostedJobs();
      });
    }
  }; */

  trackByFn(index: number, item: any): any {
    return item._id || index;
  }
  /* horizontalPosition: MatSnackBarHorizontalPosition = 'end'; // Add this line
  verticalPosition: MatSnackBarVerticalPosition = 'bottom'; // Add this line
  
  
  showSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000, // Set the duration for the snackbar to be displayed (in milliseconds)
      horizontalPosition: this.horizontalPosition, // Use the horizontal position
      verticalPosition: this.verticalPosition // Use the vertical position
    });
  }
  
  logOut() {
    const confirmation = window.confirm("Do you want to end this session?");
    if (confirmation) {
      this._authService.signOut().subscribe(response => {
        this.showSnackBar('Logout Successful');
        this._router.navigate(['home']);
      });
    }
  } */
}
