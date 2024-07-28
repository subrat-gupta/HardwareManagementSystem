import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ManagementComponent } from './hardware/management/management.component';
import { HomeComponent } from './home/home.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { UserManagementComponent } from './dashboard/admin-dashboard/user-management/user-management.component';
import { IssueRequestComponent } from './dashboard/admin-dashboard/issue-request/issue-request.component';
import { RequestComponent } from './dashboard/admin-dashboard/request/request.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path:"home",component:HomeComponent},
    {path:"login",component:HomeComponent},
    {path:"register",component:RegisterComponent},
    {path:"hardware/management",component:ManagementComponent},
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard], children: [
        { path: 'hardware/management', component: ManagementComponent },
        { path: 'users', component: UserManagementComponent },
        { path: 'issue-return', component: IssueRequestComponent },
        { path: 'request', component:RequestComponent  },
    ] },
    { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
    {path :"**",component:PageNotFoundComponent},
];
