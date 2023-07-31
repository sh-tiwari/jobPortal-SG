import { Route, RouterModule } from "@angular/router";
import { RecruiterComponent } from "./recruiter.component";

import { RecruiterLoginComponent } from "./recruiter.login/recruiter.login.component";
import { RecruiterSignupComponent } from "./recruiter.signup/recruiter.signup.component";

export const RecruiterRoute: Route[] = [
    {
        path:'',
        component:RecruiterComponent,
        children:[
            
            {
                path:'',
                pathMatch:'full',
                component: RecruiterLoginComponent
            },


            {
                path:'signup',
                pathMatch:'full',
                component: RecruiterSignupComponent
            },
            
        ]
    }
]