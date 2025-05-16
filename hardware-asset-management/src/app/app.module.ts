import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { WelcomeComponent } from './admin-dashboard/welcome/welcome.component';
import { ProfileComponent } from './admin-dashboard/profile/profile.component';
import { ProjectsComponent } from './admin-dashboard/projects/projects.component';
import { AddEditProjectDialogComponent } from './admin-dashboard/add-edit-project-dialog/add-edit-project-dialog.component';
import { UsersComponent } from './admin-dashboard/users/users.component';
import { AddEditUserDialogComponent } from './admin-dashboard/add-edit-user-dialog/add-edit-user-dialog.component';
import { HardwareComponent } from './admin-dashboard/hardware/hardware.component';
import { AddEditHardwareDialogComponent } from './admin-dashboard/add-edit-hardware-dialog/add-edit-hardware-dialog.component';
import { UserRequestsComponent } from './admin-dashboard/user-requests/user-requests.component';
import { SearchResultsComponent } from './admin-dashboard/search-results/search-results.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { MyRequestsComponent } from './employee-dashboard/my-requests/my-requests.component';
import { RequestHardwareComponent } from './employee-dashboard/request-hardware/request-hardware.component';
import { HardwareListComponent } from './employee-dashboard/hardware-list/hardware-list.component';
import { EmployeeWelcomeComponent } from './employee-dashboard/employee-welcome/employee-welcome.component';
import { MyBucketComponent } from './employee-dashboard/my-bucket/my-bucket.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    AdminDashboardComponent,
    WelcomeComponent,
    ProfileComponent,
    ProjectsComponent,
    AddEditProjectDialogComponent,
    UsersComponent,
    AddEditUserDialogComponent,
    HardwareComponent,
    AddEditHardwareDialogComponent,
    UserRequestsComponent,
    SearchResultsComponent,
    EmployeeDashboardComponent,
    MyRequestsComponent,
    RequestHardwareComponent,
    HardwareListComponent,
    EmployeeWelcomeComponent,
    MyBucketComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // Register the interceptor
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
