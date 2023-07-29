import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandAuthService } from 'src/app/core/auth/cand-auth.service';
import { ToastService } from 'src/app/shared/toast.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit  {
  candidateLogin :FormGroup;
  candidateRegister :FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService :CandAuthService,
    private _activatedRoute:ActivatedRoute,
    private _router: Router,
    private _toasterService: ToastService

  ){}
  
ngOnInit(): void {
    this.candidateLogin = this._formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['', Validators.required]
    })
    this.candidateRegister = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required]
    })
  }

  candiLogin(){
    if (this.candidateLogin.invalid) {
      if (this.candidateLogin.get('email').hasError('required')) {
        alert('Please fill in all required fields.');
      } else if(this.candidateLogin.get('email').hasError('email')){
        alert('Enter a valid email');
      } else{
        alert('Please fill in all required fields.');
      }
      return;
    }

    // Disable the form
    this.candidateLogin.disable();
    console.log(this.candidateLogin.value);

     // Sign in
     this._authService.signIn(this.candidateLogin.value)
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
         this.candidateLogin.enable();

         // Reset the form
         this.candidateLogin.reset();

         // Set the alert                    
         this._toasterService.showToast('Failed to login', '', 'error');
       }
     );
   }

  
  candiRegister(){
    if (this.candidateRegister.invalid) {
      if (this.candidateRegister.get('email').hasError('required')) {
        alert('Please fill in all required fields.');
      } else if(this.candidateRegister.get('email')?.hasError('email')){
        alert('Enter a valid email');
      } else{
        alert('Please fill in all required fields.');
      }
      return;
    }

    this.candidateRegister.disable();
    console.log(this.candidateRegister.value);

    // Register the candidate
    this._authService.register(this.candidateRegister.value).subscribe(
      () => {
        // Re-enable the form
        this.candidateRegister.enable();

        // Reset the form
        this.candidateRegister.reset();

        // Show success message
        this._toasterService.showToast('Registration Successful', '', 'success');
      },
      (response) => {
        // Re-enable the form
        this.candidateRegister.enable();

        // Reset the form
        this.candidateRegister.reset();

        // Show error message
        this._toasterService.showToast('This email is already registered.', '', 'error');
      }
    );
  }



  showLoginForm: boolean = true;

  toggleForms() {
    this.showLoginForm = !this.showLoginForm;
  }

  
  
  
}
