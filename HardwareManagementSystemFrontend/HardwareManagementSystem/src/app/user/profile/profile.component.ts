import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserManagementService } from '../../shared/services/user-management.service';
import { AuthService } from '../../shared/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '../../shared/shared.module';

export interface User {
  id: number;
  name: string;
  email: string;
  userType: {
    description: string;
  };
}

@Component({
  selector: 'profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule,SharedModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  editProfileForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    private userManagementService: UserManagementService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.editProfileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userType: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userManagementService.getUserById(currentUser.id).subscribe(
        user => {
          this.user = user;
          this.editProfileForm.patchValue({
            name: user.name,
            email: user.email,
            userType: user.userType.description
          });
        },
        error => {
          console.error('Error fetching user profile', error);
          this.snackBar.open('Error fetching user profile', 'Close', { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open('User not found, please log in again.', 'Close', { duration: 3000 });
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  onSubmit(): void {
    if (this.editProfileForm.valid) {
      const updatedUser = {
        ...this.editProfileForm.value,
        id: this.user?.id
      };

      this.userManagementService.editUser(updatedUser).subscribe(
        () => {
          this.snackBar.open('Profile updated successfully', 'Close', { duration: 3000 });
          this.isEditing = false;
          if (this.user) {
            this.user.name = updatedUser.name;
            this.user.email = updatedUser.email;
            this.user.userType.description = updatedUser.userType;
          }
        },
        error => {
          console.error('Error updating profile', error);
          this.snackBar.open('Error updating profile', 'Close', { duration: 3000 });
        }
      );
    }
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }
}
