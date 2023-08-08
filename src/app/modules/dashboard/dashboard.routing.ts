import { Route } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { AppliedJobsComponent } from "./applied-jobs/applied-jobs.component";



export const DashboardRoute: Route[] = [
    {
        path:'',
        children:[
            {
                path:'',
                component:DashboardComponent
            },
            {
                path:'applied-jobs',
                component:AppliedJobsComponent
            }

        ]
        
    }
]