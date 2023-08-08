import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import {  Router, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ToastService } from 'src/app/shared/toast.service';


@Component({
  selector: 'app-recruiter.signup',
  templateUrl: './recruiter.signup.component.html',
  styleUrls: ['./recruiter.signup.component.scss']
})
export class RecruiterSignupComponent implements OnInit {

  recruiterSignup: FormGroup;
  
  constructor(
    private form :FormBuilder,
    private _router: Router,
    private _authService :AuthService,
    private _toasterService :ToastService


  ){}

  ngOnInit(): void {
      this.recruiterSignup= this.form.group({
        companyName:['',Validators.required],
        recruiterName:['',Validators.required],
        designation:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        password:['',Validators.required]
      })
  }

 
  onReactiveFormSubmit(){
    if (this.recruiterSignup.invalid) {
      if (this.recruiterSignup.get('email').hasError('required')) {
        alert('Please fill in all required fields.');
      } else if(this.recruiterSignup.get('email')?.hasError('email')){
        alert('Enter a valid email');
      } else{
        alert('Please fill in all required fields.');
      }
      return;
    }

    this.recruiterSignup.disable();
    console.log(this.recruiterSignup.value);

    // Register the candidate
    this._authService.recRegister(this.recruiterSignup.value).subscribe(
      () => {
        // Re-enable the form
        this.recruiterSignup.enable();

        // Reset the form
        this.recruiterSignup.reset();

        // Show success message
        this._toasterService.showToast('Registration Successful', '', 'success');
        this._router.navigateByUrl('recruiter');
      },
      (response) => {
        // Re-enable the form
        this.recruiterSignup.enable();

        // Reset the form
        this.recruiterSignup.reset();

        // Show error message
        this._toasterService.showToast('This email is already registered.', '', 'error');
      }
    );
  }

}
