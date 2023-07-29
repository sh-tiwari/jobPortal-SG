import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  adminLogin: FormGroup | any;

  private unsubscribeall:Subject <any> =new Subject<any>();

  constructor(
    private _formBuilder : FormBuilder, 
    private _router: Router,
    private _authService :AuthService,
    private _activatedRoute:ActivatedRoute
    ) {}
  ngOnInit(): void {

    this.adminLogin = this._formBuilder.group({
      username: ["", [Validators.required,]],
      password: ["", [Validators.required]]
    });
  }
  ngOnDestroy(){
    this.unsubscribeall;
  }

  onReactiveFormSubmit(): void {
    // Return if the form is invalid
    if (this.adminLogin.invalid) {
      return;
    }

    // Disable the form
    this.adminLogin.disable();
    console.log(this.adminLogin.value)

    // Sign in
       this._authService.signIn(this.adminLogin.value)
      .subscribe(
        () => {

          // Set the redirect url.
          // The '/ */signed-in-redirect' is a dummy url to catch the request and redirect the user
          // to the correct page after a successful sign in. This way, that url can be set via
          // routing file and we don't have to touch here.
          const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

          // Navigate to the redirect url
          this._router.navigateByUrl(redirectURL);
          

        },
        (response) => {

          // Re-enable the form
          this.adminLogin.enable();

          // Reset the form
          this.adminLogin.reset();

          // Set the alert     
          alert('login Failed')               
          //this._toasterService.showToast('Failed to login', '', 'error');
        }
      );
  }

  onClick() {
    // Open a new window and close the current window
    const newWindow = window.open('home', '_self');
    newWindow.close();
  }
}
