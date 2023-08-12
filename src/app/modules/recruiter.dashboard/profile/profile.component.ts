// profile.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isEditing: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("Current",currentUser);
    /* if (this.isEditing) { */
      this.profileForm = this.fb.group({
        companyName: [currentUser.companyName, Validators.required],
        companyWebsite: [currentUser.companyWebsite, Validators.required],
        recruiterName: [currentUser.recruiterName, Validators.required],
        designation: [currentUser.designation, Validators.required],
        mobile: [currentUser.mobile, Validators.required],
        location: [currentUser.location, Validators.required],
        city: [currentUser.city, Validators.required],
        country: [currentUser.country, Validators.required],
        postcode: [currentUser.postcode, Validators.required]
      });
    
      this.profileForm.disable();
  }
  

  startEdit() {
    this.isEditing = true;
    this.profileForm.enable();
  }

  saveProfile() {
    // Implement saving logic here
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
    // Reset form values if needed
  }
}
