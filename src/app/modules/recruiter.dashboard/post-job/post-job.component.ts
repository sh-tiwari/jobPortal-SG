import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/core/services/job.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {
  jobForm:FormGroup;

  constructor(
    private _formBuilder : FormBuilder,
    private _jobService : JobsService,
    private _snackBar : MatSnackBar,
    private _router : Router
  ){}


  ngOnInit(): void {
    this.jobForm = this._formBuilder.group({
      jobTitle:['',Validators.required],
      companyName:[''],
      jobType:['',Validators.required],
      description:[''],
      workingHours:[''],
      experience:['',Validators.required],
      salary:['',Validators.required],
      city:[''],
      postcode:['']
    })
  }

  onSubmit(){
    if (this.jobForm.invalid){
      return
    }
    this.jobForm.disable();
    console.log(this.jobForm.value);

    this._jobService.create(this.jobForm.value).subscribe(
      ()=>{
        this.jobForm.enable();
        this.jobForm.reset();
        this.showSnackBar('Job Created Successfully');
        this._router.navigate(['recruiter-dashboard']);
      }
    )

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
  
}
