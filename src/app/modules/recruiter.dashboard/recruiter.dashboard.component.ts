import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recruiter.dashboard',
  templateUrl: './recruiter.dashboard.component.html',
  styleUrls: ['./recruiter.dashboard.component.scss']
})
export class RecruiterDashboardComponent  implements OnInit{
  
  //dashboard parameter

  totalUsers: number = 0;
  
  
  
  
  //Sidebar toggle show hide function
  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  data:any;
  constructor(private http: HttpClient){
  //get request from web api
    this.http.get('').subscribe(data => {
      this.data = data;
    
          }, error => console.error(error));
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}


