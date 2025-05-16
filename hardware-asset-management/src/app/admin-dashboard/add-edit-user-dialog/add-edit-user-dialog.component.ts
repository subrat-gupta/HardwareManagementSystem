import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-user-dialog',
  templateUrl: './add-edit-user-dialog.component.html',
  styleUrls: ['./add-edit-user-dialog.component.scss']
})
export class AddEditUserDialogComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data.mode === 'edit') {
      this.userForm.patchValue(this.data.user);
      this.userForm.get('password')?.clearValidators(); // Password not required for edit
    }
  }

  onSave(): void {
    if (this.userForm.invalid) {
      return;
    }

    const user = this.userForm.value;
    if (this.data.mode === 'add') {
      this.userService.addUser(user).subscribe(
        (response) => {
          this.snackBar.open('User added successfully!', 'Close', { duration: 3000 });
          this.dialogRef.close(true);
        },
        (error) => {
          this.snackBar.open('Error adding user', 'Close', { duration: 3000 });
        }
      );
    } else {
      this.userService.updateUser(this.data.user.userId, user).subscribe(
        (response) => {
          this.snackBar.open('User updated successfully!', 'Close', { duration: 3000 });
          this.dialogRef.close(true);
        },
        (error) => {
          this.snackBar.open('Error updating user', 'Close', { duration: 3000 });
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
