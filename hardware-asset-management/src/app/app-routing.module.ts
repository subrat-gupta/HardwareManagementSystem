import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { WelcomeComponent } from './admin-dashboard/welcome/welcome.component';
import { ProfileComponent } from './admin-dashboard/profile/profile.component';
import { ProjectsComponent } from './admin-dashboard/projects/projects.component';
import { HardwareComponent } from './admin-dashboard/hardware/hardware.component';
import { UsersComponent } from './admin-dashboard/users/users.component';
import { UserRequestsComponent } from './admin-dashboard/user-requests/user-requests.component';
import { SearchResultsComponent } from './admin-dashboard/search-results/search-results.component';
import { EmployeeWelcomeComponent } from './employee-dashboard/employee-welcome/employee-welcome.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { HardwareListComponent } from './employee-dashboard/hardware-list/hardware-list.component';
import { RequestHardwareComponent } from './employee-dashboard/request-hardware/request-hardware.component';
import { MyRequestsComponent } from './employee-dashboard/my-requests/my-requests.component';
import { MyBucketComponent } from './employee-dashboard/my-bucket/my-bucket.component';
import { AddEditProjectDialogComponent } from './admin-dashboard/add-edit-project-dialog/add-edit-project-dialog.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/new', component: AddEditProjectDialogComponent },
      { path: 'users', component: UsersComponent },
      { path: 'hardware', component: HardwareComponent },
      { path: 'requests', component: UserRequestsComponent },
      { path: 'search-results', component: SearchResultsComponent },
    ],
  },
  {
    path: 'employee-dashboard',
    component: EmployeeDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: EmployeeWelcomeComponent },
      { path: 'welcome', component: EmployeeWelcomeComponent },
      { path: 'AvailableHardwares', component: HardwareListComponent },
      { path: 'newRequest', component: RequestHardwareComponent },
      { path: 'myBucket', component: MyBucketComponent },
      { path: 'myRequests', component: MyRequestsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
