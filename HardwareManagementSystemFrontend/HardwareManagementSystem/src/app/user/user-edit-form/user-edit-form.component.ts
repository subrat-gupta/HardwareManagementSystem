import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, UserType } from '../user-management/user-management.component';
import { UserManagementService } from '../../services/user-management.service';
@Component({
  selector: 'user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrl: './user-edit-form.component.scss'
})
export class UserEditFormComponent implements OnInit {
  userForm: FormGroup;
  userTypes: UserType[] = [];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserEditFormComponent>,
    private userManagementService: UserManagementService,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, userTypes: UserType[] }
  ) {
    this.userTypes = data.userTypes;
    this.userForm = this.fb.group({
      id: [data.user?.id || '', Validators.required],
      contactNumber: [data.user?.contactNumber || '', Validators.required],
      emailId: [data.user?.emailId || '', [Validators.required, Validators.email]],
      isActive: [data.user?.isActive || true, Validators.required],
      location: [data.user?.location || '', Validators.required],
      name: [data.user?.name || '', Validators.required],
      password: [data.user?.password || '', Validators.required],
      racfId: [data.user?.racfId || '', Validators.required],
      saltPassword: [data.user?.saltPassword || '', Validators.required],
      userType: [data.user?.userType?.description|| '', Validators.required]
    });
  }
  ngOnInit(): void {
    if (this.data) {
      this.userForm.patchValue(this.data);
    }
    this.loadUserTypes();
  }
  loadUserTypes(){
    this.userManagementService.getUserTypes().subscribe(userTypes => {
      this.userTypes = userTypes;
    });
  }
 
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      // Map userType description to userType object
      formData.userType = this.userTypes.find(type => type.description === formData.userType);
      this.dialogRef.close(formData);
    }
  }
}