import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ManagementComponent } from './hardware/management/management.component';
import { HomeComponent } from './home/home.component';
import { UserManagementComponent } from './user/user-management/user-management.component';
import { IssueReturnComponent } from './hardware/issue-return/issue-return.component';

export const routes: Routes = [
  { path: 'hardware/management', component: ManagementComponent },
  { path: 'hardware/management/issue-return', component: IssueReturnComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user/management',component:UserManagementComponent},
  { path: '**', component: PageNotFoundComponent },
];
