import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from './management/management.component';
import { MaterialModule } from '../material/material.module';
import { IssueReturnComponent } from './issue-return/issue-return.component';



@NgModule({
  declarations: [
    ManagementComponent,IssueReturnComponent
  ],
  imports: [
    CommonModule,MaterialModule
  ]
})
export class HardwareModule { }
