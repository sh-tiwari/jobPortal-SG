import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CompaniesBasicData, CompanyBasic } from 'src/app/core/models/campany.model';
import { Job, JobBasicData, JobBasicDatas } from 'src/app/core/models/job.model';
import { CompanyService } from 'src/app/core/services/company.service';
import { JobsService } from 'src/app/core/services/job.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit{
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;
  
  companyData: CompanyBasic[] | any;
  /**
   * here columns of table are declared
  */
  page = {
    filter: "",
    type: "company",
    // sort: -1,
  };

  

  // Define the column names here
  companyListTableColumns: string[] = ['companyName', 'companyWebsite', 'city', 'action'];
  data: MatTableDataSource<any> = new MatTableDataSource();


  constructor(
    private _companyService: CompanyService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _toasterService: ToastService
  ) { }

  ngOnInit(): void {
    this.fetchAll();
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

  ngOnDestroy(): void { }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------


  /**
   * @fetchall this function is used to fetch all data
  */
  fetchAll() {
    this._companyService.fetchAll(this.page).subscribe((response: CompaniesBasicData) => {
      // Get the users
      this.companyData = response.data || [];
      console.log("company Data",this.companyData)
      // Assign it to data of table
      this.data.data = this.companyData;
      console.log("data.data",this.data)
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  };

  /**
   * Search filter for user
   * @param event
  */
  searchCompany(event: any) {
    this.page.filter = event.target.value;
    this.fetchAll();
  }

  /**
   * @deleteFn function is used for delete data
  */
  deleteFn(id: string): void {
    if (confirm("Are you sure to delete ?")) {
      this._companyService.delete(id).subscribe(response => {
        this._toasterService.showToast('Deleted Successfully', '', 'success');
        this.fetchAll();
      });
    }
  };

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item._id || index;
  }
}
