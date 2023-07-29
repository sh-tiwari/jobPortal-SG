import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable, of, switchMap } from 'rxjs';
import { Injectable, inject } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
class NoPermissionsService {

  constructor(private _router: Router, private _authService: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._check();
  }

  private _check(): Observable<boolean>
  {
      // Check the authentication status
      return this._authService.check()
                 .pipe(
                     switchMap((authenticated) => {

                         // If the user is not authenticated...
                         if ( authenticated )
                         {
                             // Redirect to the sign-in page
                             this._router.navigate(['admin-dashboard']);

                             // Prevent the access
                             return of(false);
                         }

                         // Allow the access
                         return of(true);
                     })
                 );
  }
}
export const NoAuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean => {
  return inject(NoPermissionsService).canActivate(next, state);
}

