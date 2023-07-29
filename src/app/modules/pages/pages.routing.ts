import { Route } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";



export const PagesRoute: Route[] = [
    {
        path:'',
        component:PagesComponent,
        children:[
            {
                path:'',
                pathMatch:'full',
                component: LandingPageComponent
            }
        ]
    }
]