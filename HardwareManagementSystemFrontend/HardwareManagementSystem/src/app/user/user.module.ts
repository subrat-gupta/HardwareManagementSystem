import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { HttpClientModule } from '@angular/common/http';
import { UserEditFormComponent } from './user-edit-form/user-edit-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
@NgModule({
  declarations: [
    UserManagementComponent,
    UserEditFormComponent
  ],
  imports: [
    CommonModule,MaterialModule,HttpClientModule,FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
