import { Route } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { CandidatesComponent } from "../candidates/candidates.component";
import { CompaniesComponent } from "../companies/companies.component";
import { JobsComponent } from "../jobs/jobs.component";
import { DbComponent } from "./db/db.component";

export const AdminRoute: Route[] = [
    { path:'',
     component: AdminComponent,
     children:[
        {
            path: '',
            component:DbComponent
        },
        {
            path:'candidates',
            pathMatch:'full',
            component: CandidatesComponent
        },
        {
            path:'companies',
            pathMatch:'full',
            component: CompaniesComponent
        },
        {
            path:'jobs',
            pathMatch:'full',
            component: JobsComponent
        },
        ]
    },
    
]