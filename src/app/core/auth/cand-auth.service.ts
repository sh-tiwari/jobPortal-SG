import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { CandAuthUtils } from './cand-auth.utils';

@Injectable({
  providedIn: 'root'
})
export class CandAuthService {
  private baseURL = 'http://localhost:8081/api';
  private _authenticated: boolean = false;

  constructor(private _httpClient: HttpClient) { }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }


  signIn(credentials: { email: string; password: string }): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
        return throwError('User is already logged in.');
    }

    return this._httpClient.post(`${this.baseURL}/candidate/login`, credentials).pipe(
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



  register(userData: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    

    // Register the candidate
    return this._httpClient.post(`${this.baseURL}/candidate/register`, userData).pipe(
      catchError((error) => {
        // Handle registration error
        console.log('Registration error:', error);
        // You can show an error message using the ToastService or any other approach
        // Example: this._toasterService.showToast('Registration Failed', '', 'error');

        // Re-throw the error to be handled by the component
        return throwError(error);
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
    if (CandAuthUtils.isTokenExpired(this.accessToken)) {
        return of(false);
    }
    // Check the access token availability
    if (!this.accessToken) {
        return of(false);
    }
    return of(true);
  }
}
