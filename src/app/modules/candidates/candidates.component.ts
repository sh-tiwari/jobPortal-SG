import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CandidateBasic, CandidatesBasicData } from 'src/app/core/models/candidate.model';
import { Job, JobBasicData, JobBasicDatas } from 'src/app/core/models/job.model';
import { CandidateService } from 'src/app/core/services/candidate.service';
import { JobsService } from 'src/app/core/services/job.service';
import { MoreDailogueBoxComponent } from 'src/app/shared/more-dailogue-box/more-dailogue-box.component';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent {
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;
  page = {
    filter: "",
    status: ""
    // sort: -1,
  };

  candidatesData: CandidateBasic[] | any;

  candidatesListTableColumns: string[] = [ 'name', 'email','mobile', 'action'];
  data: MatTableDataSource<any> = new MatTableDataSource();

  constructor(
    private _candidateService: CandidateService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _toasterService: ToastService,
    private dialog: MatDialog

  ){}

  ngOnInit(): void {
    this.fetchAll()
  }


  openMoreDialog(candidate: CandidateBasic) {
    console.log("candidate",candidate)
    const dialogRef = this.dialog.open(MoreDailogueBoxComponent, {
      width: '400px', // Adjust the width as needed
      data: candidate
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any dialog close actions if needed
    });
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
    this._candidateService.fetchAll(this.page).subscribe((response) => {
      // Get the users
      this.candidatesData = response.data || [];

      // Assign it to data of table
      this.data.data = this.candidatesData;

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
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

  searchUser(event: any) {
    this.page.filter = event.target.value;
    this.fetchAll();
  }

  statusFilter(event: MatSelectChange) {
    this.page.status = event.value;
    this.fetchAll();
  }

  /* deleteFn(id: string): void {
    if (confirm("Are you sure to delete ?")) {
      this._jobsService.delete(id).subscribe(response => {
        this._toasterService.showToast('Deleted Successfully', '', 'success');
        this.fetchAll();
      });
    }
  }; */

  trackByFn(index: number, item: any): any {
    return item._id || index;
  }
}
