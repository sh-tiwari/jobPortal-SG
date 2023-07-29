import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError, from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CandidateBasic, CandidateBasicData, CandidatesBasicData } from '../models/candidate.model'
import {  JobBasicDatas } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  sidebar: boolean = true;
  private baseURL = 'http://localhost:8081/api/candidates';

  constructor(private _httpClient: HttpClient) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------


  /**
   * Gets all user
   */
  fetchAll(params: any): Observable<CandidatesBasicData> {
    return this._httpClient.get<CandidatesBasicData>(`${this.baseURL}/`, { params: params });
  }

  /**
   * Gets users
   */
  getUser(params: any): Observable<CandidatesBasicData[]> {
    return this._httpClient.get<CandidatesBasicData[]>(`${this.baseURL}/`, { params: params });
  }

  /**
   * Get user
   */
  fetch(id: string): Observable<CandidateBasicData> {
    return this._httpClient.get<CandidateBasicData>(`${this.baseURL}/${id}`);
  }


  /**
   * Create user
   */
  create(data: CandidateBasic) {
    return this._httpClient.post<CandidateBasic[]>(`${this.baseURL}/`, data);
  }

  /**
   * Delete user
   */
  delete(id: string) {
    return this._httpClient.delete<CandidateBasic[]>(`${this.baseURL}/${id}`);
  }

  /**
   * Update user
   */
  update(id: string, userData: CandidateBasic) {
    return this._httpClient.put<CandidateBasic[]>(`${this.baseURL}/${id}`, userData);
  }

  /**
   * Fetch Posted jobs
   */
  postedJobs(id: string): Observable<JobBasicDatas> {
    return this._httpClient.get<JobBasicDatas>(`${this.baseURL}/posted-job/${id}`);
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
export { CandidatesBasicData };

