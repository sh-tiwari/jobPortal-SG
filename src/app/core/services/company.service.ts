import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Job, JobBasicData, JobBasicDatas } from '../models/job.model';
import { CompaniesBasicData, CompanyBasic, CompanyBasicData } from '../models/campany.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  sidebar: boolean = true;
  private baseURL = `${environment.apiUrl}/recruiter`;

  constructor(private _httpClient: HttpClient) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------


  /**
   * Gets all user
   */
  fetchAll(params: any): Observable<CompaniesBasicData> {
    return this._httpClient.get<CompaniesBasicData>(`${this.baseURL}/`, { params: params });
  }

  /**
   * Gets users
   */
  getUser(params: any): Observable<CompaniesBasicData[]> {
    return this._httpClient.get<CompaniesBasicData[]>(`${this.baseURL}/`, { params: params });
  }

  /**
   * Get user
   */
  fetch(id: string): Observable<CompanyBasicData> {
    return this._httpClient.get<CompanyBasicData>(`${this.baseURL}/${id}`);
  }


  /**
   * Create user
   */
  create(data: CompanyBasic) {
    return this._httpClient.post<CompanyBasic[]>(`${this.baseURL}/`, data);
  }

  /**
   * Delete user
   */
  delete(id: string) {
    return this._httpClient.delete<CompanyBasic[]>(`${this.baseURL}/${id}`);
  }

  /**
   * Update user
   */
  update(id: string, userData: CompanyBasic) {
    return this._httpClient.put<CompanyBasic[]>(`${this.baseURL}/${id}`, userData);
  }

  /**
   * Fetch Posted jobs
   */
  postedJobs(id: string): Observable<JobBasicDatas> {
    return this._httpClient.get<JobBasicDatas>(`${this.baseURL}/posted-job/${id}`);
  } 
  getPostedJobs(recruiterId: string): Observable<Job[]> {
    return this._httpClient.get<Job[]>(`${this.baseURL}/${recruiterId}/postedJobs`);
  } 

  /**
  * Fetch Applied Jobs
  */
  fetchAppliedJobs(id: string): Observable<JobBasicDatas> {
    return this._httpClient.get<JobBasicDatas>(`${this.baseURL}/applied-job/${id}`);
  }

  /**
   * Update admin data
   */
  updateAdmin(id: string, adminData: any) {
    return this._httpClient.put<any[]>(`${this.baseURL}/admin/${id}`, adminData);
  }

  /**
   * Store the user
   * @param user
   */

  setUserData(admin: any) {
    localStorage.setItem('currentUser', JSON.stringify(admin));
  }

  /**
   *
   * @returns Object
   */
  getUserData(): { admin: any, role: string } {
    let user: any = localStorage.getItem('currentUser');
    if (user) {
      user = JSON.parse(user);
      return {
        admin: user,
        role: user.role
      };
    } else {
      return { admin: '', role: '' };
    };
  }

  /**
   * Remove current user
   */
  clearUserData() {
    localStorage.removeItem('currentUser');
  }
}
export { CompaniesBasicData };

