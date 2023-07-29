import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AuthUtils } from './auth.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = 'http://localhost:8081/api';
  private _authenticated: boolean = false;

  constructor(
    private _httpClient: HttpClient
  ) { }

  // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
    */
    get accessToken(): string {
      return localStorage.getItem('accessToken') ?? '';
  }

  set accessToken(token: string) {
      localStorage.setItem('accessToken', token);
  }

  // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     *
     * @param credentials
     */   

    signIn(credentials: { username: string; password: string }): Observable<any> {
      // Throw error, if the user is already logged in
      if (this._authenticated) {
          return throwError('User is already logged in.');
      }

      return this._httpClient.post(`${this.baseURL}/admin/login`, credentials).pipe(
          switchMap((response: any) => {

              if (response.success) {
                  // Store the access token in the local storage
                  this.accessToken = response.token;

                  // Set the authenticated flag to true
                  this._authenticated = true;

                  

                  // Store the user on the user service
                  localStorage.setItem('currentUser', JSON.stringify(response.user));
                  localStorage.setItem('role', JSON.stringify(response.role ));

                }

              // Return a new observable with the response
              return of(response);
          })
      );
  }


  getUserData(): { user: any, role: string } {
    let user: any = localStorage.getItem('currentUser');
    let role:any =localStorage.getItem('role');
    if (user) {

      user = JSON.parse(user);
      role= JSON.parse(role);
      return {
        user: user,
        role:role
      };
    } else {
      return { user: '', role: '' };
    };
  }
  

  /**
   * Sign out
   */
  signOut(): Observable<any> {
      // Remove the access token from the local storage
      localStorage.removeItem('accessToken')

      // for clear users data
      localStorage.removeItem('currentUser');
      localStorage.removeItem('role');

      // Set the authenticated flag to false
      this._authenticated = false;
      
      // Return the observable
      return of(true);
  }    

  check() {
    // Check if the user is logged in
    if (this._authenticated) {
        return of(true);
    }
    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.accessToken)) {
        return of(false);
    }
    // Check the access token availability
    if (!this.accessToken) {
        return of(false);
    }
    return of(true);
}

}
