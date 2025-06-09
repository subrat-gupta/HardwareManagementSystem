import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isEditing = false;
  userData: any;
  projects: any[] = []; // Store project list for dropdown

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private projectService: ProjectService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      userId: [{ value: '', disabled: true }],
      employeeId: [{ value: '', disabled: true }],
      name: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      password: [{ value: '', disabled: true }],
      role: [{ value: '', disabled: true }, [Validators.required]],
      projectName: [{ value: '', disabled: true }, [Validators.required]]
    });
  }

  ngOnInit(): void {
    const email = this.authService.getUser()?.sub;
    if (!email) {
      console.error('Email not found!');
      return;
    }

    // Load user details
    this.userService.getUserByEmail(email).subscribe(user => {
      if (user) {
        this.userData = user;
        this.profileForm.patchValue({
          ...user,
          projectName: user.project?.name
        });
      }
    });

    // Load available projects
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    const fields = ['name', 'password', 'projectName'];
    fields.forEach(field => {
      this.isEditing ? this.profileForm.controls[field].enable() : this.profileForm.controls[field].disable();
    });
  }

  onSave(): void {
    if (this.profileForm.invalid) return;

    const userId = this.userData?.userId;
    if (!userId) {
      this.snackBar.open('User ID missing!', 'Close', { duration: 3000 });
      return;
    }

    const formData = this.profileForm.getRawValue(); // Ensures all values are included

    // Prepare updated user data
    const updatedUser = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      project: this.projects.find(p => p.name === formData.projectName) // Assign full project object
    };

    this.userService.updateUser(userId, updatedUser).subscribe(
      () => this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 }),
      () => this.snackBar.open('Error updating profile', 'Close', { duration: 3000 })
    );
  }
}
