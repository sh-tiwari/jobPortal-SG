import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JobBasic, JobBasicData, JobBasicDatas } from 'src/app/core/models/job.model';
import { JobsService } from 'src/app/core/services/job.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit{
  
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;
  page = {
    filter: "",
    status: ""
    // sort: -1,
  };

  jobsData: JobBasic[] | any;

  jobsListTableColumns: string[] = [ 'jobTitle', 'companyName','salary', 'action'];
  data: MatTableDataSource<any> = new MatTableDataSource();

  constructor(
    private _jobsService: JobsService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _toasterService: ToastService

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

  statusFilter(event: MatSelectChange) {
    this.page.status = event.value;
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
