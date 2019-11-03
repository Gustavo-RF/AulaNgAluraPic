import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginGuard } from '../core/auth/login.guard';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    {
        path: '', 
        component: HomeComponent,
        canActivate: [LoginGuard],
        children: [
            {
                path: '', 
				component: SigninComponent,
				data: {
					title: 'SignIn'
				}
            },
            {
                path: 'signup', 
				component: SignupComponent,
				data: {
					title: 'SignUp'
				}
            },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class HomeRoutingModule 
{

}