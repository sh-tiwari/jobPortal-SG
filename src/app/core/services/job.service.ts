import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Job, JobBasicData, JobBasicDatas } from '../models/job.model';
import { CandidateBasic } from '../models/candidate.model';
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
  create( data: JobBasicData) {
    return this._httpClient.post<Job[]>(`${this.baseURL}/create`, data);
  }

  /**
 * Delete job
 */
  delete(id: string) {
    return this._httpClient.delete<Job[]>(`${this.baseURL}/${id}`);
  }

  /**
   * Update user
   */
  update(id: string, updates: Job) {
    return this._httpClient.put<Job[]>(`${this.baseURL}/${id}`, updates);
  }


  applyForJob(jobId: string, candidateId: string): Observable<any> {
    return this._httpClient.post<any>(`${this.baseURL}/${jobId}/apply`, {candidateId });
  }

 
  
  getApplicants(jobID:string): Observable<CandidateBasic[]>{
    return this._httpClient.get<CandidateBasic[]>(`${this.baseURL}/applicants/${jobID}`);
  }

  close(id: string, jobData: Job): Observable<Job[]> {
    // Update the status to "closed" in the userData
    jobData.status = 'closed';

    // Send the updated userData to the server
    return this._httpClient.put<Job[]>(`${this.baseURL}/${id}`, jobData);
  }
  
}




export { JobBasicDatas };

