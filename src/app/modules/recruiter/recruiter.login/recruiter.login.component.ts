import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-recruiter.login',
  templateUrl: './recruiter.login.component.html',
  styleUrls: ['./recruiter.login.component.scss']
})
export class RecruiterLoginComponent implements OnInit  {
  recruiterLogin: FormGroup;
  

  constructor(
    private form :FormBuilder,
    private _router: Router,
    private _authService :AuthService,
    private _activatedRoute:ActivatedRoute

  ){}
  ngOnInit(): void {
    this.recruiterLogin = this.form.group({
      email:    ['',[Validators.required,Validators.email]],
      password: ['',Validators.required]
    })
  }

  onClick(){
    if (this.recruiterLogin.invalid){
      return
    }

    console.log(this.recruiterLogin.value)
  }
  

  onReactiveFormSubmit(): void {
    // Return if the form is invalid
    if (this.recruiterLogin.invalid) {
      return;
    }

    // Disable the form
    this.recruiterLogin.disable();
    console.log(this.recruiterLogin.value)

    // Sign in
       this._authService.recSignIn(this.recruiterLogin.value)
      .subscribe(
        () => {

          // Set the redirect url.
          // The '/ */signed-in-redirect' is a dummy url to catch the request and redirect the user
          // to the correct page after a successful sign in. This way, that url can be set via
          // routing file and we don't have to touch here.
          const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-recruiter-redirect';

          // Navigate to the redirect url
          this._router.navigateByUrl(redirectURL);
          

        },
        (response) => {

          // Re-enable the form
          this.recruiterLogin.enable();

          // Reset the form
          this.recruiterLogin.reset();

          // Set the alert     
          alert('login Failed')               
          //this._toasterService.showToast('Failed to login', '', 'error');
        }
      );
  }




}