import { Route, RouterModule } from "@angular/router";
import { RecruiterDashboardComponent } from "./recruiter.dashboard.component";
import { PostJobComponent } from "./post-job/post-job.component";


export const RecruiterDashboardRoute: Route[] = [
    {
        path:'',
        children:[
            {
                path:'',
                component:RecruiterDashboardComponent
            },
            {
                path:'post-job',
                component:PostJobComponent
            }
        ]
        
    }
]