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
import { CandidateBasic } from 'src/app/core/models/candidate.model';


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

    this.fetchAll();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("current user :",currentUser);
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
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._jobsService.fetchAll(this.page).subscribe((response: JobBasicData) => {
      console.log("response data",response);
      // Get the users
      this.jobsData = response.data || [];
      console.log("jobData",this.jobsData.data);
      // Assign it to data of table
      this.data.data = this.jobsData;
      
      
      
      for (let i=0;i<this.data.data.length;i++){
        for (let j = 0;j<this.data.data[i].applicants.length; j++){
          //console.log(i,j);
          if (this.data.data[i].applicants[j]._id == currentUser._id){
            console.log("job is applied by ",this.data.data[i].applicants[j]);
            let isJobApplied = true;
          } 
        }
      }
      console.log(this.jobsData.filterdata);
      this.isJobApplied(this.jobsData.filterdata);

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

  // Function to check if the job ID is applied
  isJobApplied(data:any): any{
    let isApplied=false;

    console.log("applied job data",data._id)
    const currentUser:CandidateBasic = JSON.parse(localStorage.getItem('currentUser'));
    console.log('current user in applied job==>',currentUser);
    
    // for (let i=0;i<currentUser.appliedJobs;i++){
    //   if (currentUser.appliedJobs[i]._id == data._id){
    //     console.log("data found",data);
    //     isApplied=true;
    //   }

        
    //   }
    // return isApplied; 
    let job=currentUser.appliedJobs.find(job=>job._id==data._id)
    console.log('found==>',job);
    if(job){
      return true
    }else {
      return false
    }

    

    }
  

  applyToJob(jobId){
    /* if (this.isJobApplied()) {
      // Job is already applied, do nothing or show a message
      return;
    } */
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    console.log("candidate=>",currentUser._id,"is applying for",jobId," job");
    if(currentUser){
      this._jobsService.applyForJob(jobId,`${currentUser._id}`).subscribe((response : any)=>{
        console.log(response);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        alert("Are You Sure?")
        this.showSnackBar('Job Applied Successful');
      })
    }

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
