import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CandidateBasic, CandidatesBasicData } from 'src/app/core/models/candidate.model';
import { CandidateService } from 'src/app/core/services/candidate.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent {
  //@ViewChild(MatPaginator) private _paginator: MatPaginator;
  //@ViewChild(MatSort) private _sort: MatSort;
  
  //candidatesData: CandidateBasic[] | any;

  /* candidatesListTableColumns: any[] = [
    "candidateID",
    "name",
    "mobile",
    "email",
    "location",
    "isBlocked",
    "action",
    ]; */
    /* page = {
      filter: "",
      type: "candidate",
      // sort: -1,
    }; */
  //data: MatTableDataSource<any> = new MatTableDataSource();

  /* constructor(
    private _candidateBasicService: CandidateService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _toasterService: ToastService
  ) { } */

  /* ngOnInit(): void {
    this.fetchAll();
  } */

  /* ngAfterViewInit() {
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
  } */

  //ngOnDestroy(): void { }

  /* fetchAll() {
    this._candidateBasicService.fetchAll(this.page).subscribe((response: CandidatesBasicData) => {
      // Get the users
      this.candidatesData = response.data || [];

      // Assign it to data of table
      this.data.data = this.candidatesData;

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }; */

  /* searchUser(event: any) {
    this.page.filter = event.target.value;
    this.fetchAll();
  } */

  /**
   * @deleteFn function is used for delete data
  */
  /* deleteFn(id: string): void {
    if (confirm("Are you sure to delete ?")) {
      this._candidateBasicService.delete(id).subscribe(response => {
        this._toasterService.showToast('Deleted Successfully', '', 'success');
        this.fetchAll();
      });
    }
  }; */

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
  */
  /* trackByFn(index: number, candidateBasic: CandidateBasic): any {
    return candidateBasic._id || index;
  } */
}
