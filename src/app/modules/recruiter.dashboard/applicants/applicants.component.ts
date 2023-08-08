import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';


import { CandidateBasic, CandidateBasicData, CandidatesBasicData } from 'src/app/core/models/candidate.model';
import { JobsService } from 'src/app/core/services/job.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss']
})
export class ApplicantsComponent implements OnInit {
  applicantsData: CandidateBasic[]; // Update with your Applicant model type
  dataSource: MatTableDataSource<CandidateBasic>; // MatTableDataSource to hold applicant data
  displayedColumns: string[] = ['name', 'email','mobile','action']; // Adjust these columns

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private _jobsService: JobsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const jobID = params.get('jobId');
      this.getApplicantsForJob(jobID);
    });
  }

  getApplicantsForJob(jobID: string): void {
    this._jobsService.getApplicants(jobID).subscribe(
      (response: any) => {
        this.applicantsData = response.data; // Extract only the 'data' part
        console.log("list of applicants",this.applicantsData);
        
        // Create new MatTableDataSource with the applicantsData array
        this.dataSource = new MatTableDataSource(this.applicantsData);
        
        // Set paginator and sort for MatTableDataSource
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching applicants:', error);
        alert("Unable to fetch data");
      }
    );
  }
}