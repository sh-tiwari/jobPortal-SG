import { Route, RouterModule } from "@angular/router";
import { RecruiterDashboardComponent } from "./recruiter.dashboard.component";
import { PostJobComponent } from "./post-job/post-job.component";
import { ApplicantsComponent } from "./applicants/applicants.component";
import { ProfileComponent } from "./profile/profile.component";


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
            },
            {
                path:'applicants/:jobId',
                component:ApplicantsComponent
            },
            {
                path:'profile',
                component:ProfileComponent
            }
        ]
        
    }
]