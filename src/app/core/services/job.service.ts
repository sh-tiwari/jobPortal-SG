import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { JobBasic, JobBasicData, JobBasicDatas } from '../models/job.model';
//import { UserBasic, UserBasicData, UsersBasicData } from '../models/user-basic.model';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  sidebar: boolean = true;
  private baseURL = 'http://localhost:8081/api/jobs';
  constructor(private _httpClient: HttpClient) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Gets all jobs
   */
  fetchAllJobs(): Observable<JobBasicDatas> {
    return this._httpClient.get<JobBasicDatas>(`${this.baseURL}/`);
  }

  /**
   * Gets all jobs
   */
  fetchAll(params: any): Observable<JobBasicData> {
    return this._httpClient.get<JobBasicData>(`${this.baseURL}/`, { params: params });
  }



  /**
   * Get user
   */
  fetch(id: string): Observable<JobBasicData> {
    return this._httpClient.get<JobBasicData>(`${this.baseURL}/${id}`);
  }


  /**
   * Create user
   */
  create(data: JobBasicData) {
    return this._httpClient.post<JobBasic[]>(`${this.baseURL}/`, data);
  }

  /**
 * Delete job
 */
  delete(id: string) {
    return this._httpClient.delete<JobBasic[]>(`${this.baseURL}/${id}`);
  }

  /**
   * Update user
   */
  update(id: string, userData: JobBasic) {
    return this._httpClient.put<JobBasic[]>(`${this.baseURL}/${id}`, userData);
  }

  /**
   * Job Applicants
   */
  /* jobApplicants(id: string): Observable<UsersBasicData> {
    return this._httpClient.get<UsersBasicData>(`${this.baseURL}/job-applicants/${id}`);
  } */
}
export { JobBasicDatas };

