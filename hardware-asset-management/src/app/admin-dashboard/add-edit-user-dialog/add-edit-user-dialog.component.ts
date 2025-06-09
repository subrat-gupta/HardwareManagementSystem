import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-edit-user-dialog',
  templateUrl: './add-edit-user-dialog.component.html',
  styleUrls: ['./add-edit-user-dialog.component.scss']
})
export class AddEditUserDialogComponent implements OnInit {
  userForm: FormGroup;
  projects: any[] = [];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private projectService: ProjectService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      employeeId: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', Validators.required],
      projectId: [null, Validators.required] 
    });
  }

  ngOnInit(): void {
    if (this.data.mode === 'edit') {
      this.userForm.patchValue(this.data.user);
      this.userForm.patchValue({
          ...this.data.user,
          projectId: this.data.user.project?.projectId
        });
      this.userForm.get('password')?.clearValidators(); // Password not required for edit
    }
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(
      (data) => {
        console.log('API Response:', data);
        this.projects = data;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
  onSave(): void {
    if (this.userForm.invalid) {
      return;
    }

    const user = this.userForm.value;
    if (this.data.mode === 'add') {
      const { name, email, password, employeeId, projectId } = this.userForm.value;
    this.authService.signup(name, email, password, employeeId, projectId).subscribe(
      (response) => {
        console.log('Signup successful:', response); // ✅ Check if this runs
        this.snackBar.open('User added successfully', 'Close', { duration: 3000 });
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error during signup:', error);
        this.snackBar.open('Error during signup', 'Close', { duration: 3000 });
      }
    );
    } else {
      const formData = this.userForm.getRawValue(); // Ensures all values are included

    // Prepare updated user data
    const updatedUser = {
      employeeId: formData.employeeId,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      password: formData.password,
      project: this.projects.find(p => p.projectId === formData.projectId) // Assign full project object
    };
      this.userService.updateUser(this.data.user.userId, updatedUser).subscribe(
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
