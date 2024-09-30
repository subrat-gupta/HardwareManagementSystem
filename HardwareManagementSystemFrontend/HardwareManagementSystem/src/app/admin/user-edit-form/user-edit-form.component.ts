import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserManagementService } from '../../shared/services/user-management.service';
import { UserType, User } from '../users-management/users-management.component';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'user-edit-form',
  templateUrl: './user-edit-form.component.html',
  standalone: true,
  imports: [SharedModule],
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
      id: [data.user?.id || ''],
      kpitEmpId: [data.user?.kpitEmpId || '', Validators.required],
      contactNumber: [data.user?.contactNumber || '', Validators.required],
      email: [data.user?.email || '', [Validators.required, Validators.email]],
      isActive: [data.user?.isActive || false, Validators.required],
      location: [data.user?.location || '', Validators.required],
      name: [data.user?.name || '', Validators.required],
      password: [data.user?.password || '', Validators.required],
      userTypeId: [data.user?.userTypeId || '', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data.user) {
      this.userForm.patchValue(this.data.user);
    }
    this.loadUserTypes();
  }

  loadUserTypes() {
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
      this.dialogRef.close(formData);
    }
  }
}
