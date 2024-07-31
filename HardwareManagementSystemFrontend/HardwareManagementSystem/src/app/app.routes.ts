import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ManagementComponent } from './hardware/management/management.component';

export const routes: Routes = [
    {path:"hardware/management",component:ManagementComponent},
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
    {path :"**",component:PageNotFoundComponent},
];
