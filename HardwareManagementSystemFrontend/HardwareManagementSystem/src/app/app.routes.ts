import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ManagementComponent } from './hardware/management/management.component';

import { AuthGuard } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { RequestComponent as AdminRequestComponent } from './admin/request/request.component';
import { HomeComponent } from './home/home.component';
import { UsersManagementComponent } from './admin/users-management/users-management.component';
import { IssueReturnComponent } from './admin/issue-return/issue-return.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RequestComponent } from './user/request/request.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'hardware/management', component: ManagementComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard], children: [
        { path: 'hardware/management', component: ManagementComponent },
        { path: 'users', component: UsersManagementComponent },
        { path: 'issue-return', component: IssueReturnComponent },
        { path: 'request', component: AdminRequestComponent },
    ] },
    { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard], children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'request', component: RequestComponent },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ] },
    { path: '**', component: PageNotFoundComponent },
];
