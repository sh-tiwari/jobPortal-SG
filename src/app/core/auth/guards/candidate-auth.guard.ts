import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot,CanActivateFn, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
class PermissionsService {

  constructor(private _router: Router, private _authService: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
    return this._check(redirectUrl);
  }

  private _check(redirectURL: string): Observable<boolean>
  {
      // Check the authentication status
      return this._authService.check()
                 .pipe(
                     switchMap((authenticated) => {
                      let role:any =localStorage.getItem('role');
                      let userRole=JSON.parse(role);
                         // If the user is not authenticated...
                         if ( !authenticated  || userRole!="Candidate" )
                         {
                             // Redirect to the sign-in page
                             this._router.navigate(['home'], {queryParams: {redirectURL}});

                             // Prevent the access
                             return of(false);
                         }

                         // Allow the access
                         return of(true);
                     })
                 );
  }
}

export const CandidateAuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean => {
  return inject(PermissionsService).canActivate(next, state);
}

