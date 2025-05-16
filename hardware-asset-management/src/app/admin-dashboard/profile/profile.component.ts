import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  ngOnInit(): void {
    // Fetch current profile data and populate the form
    const user = this.authService.getUser();
    this.profileForm.patchValue({
      name: user.name,
      email: user.email
    });
  }

  onSave(): void {
    if (this.profileForm.invalid) {
      return;
    }

    const { name, email, password } = this.profileForm.value;
    this.authService.updateProfile(name, email, password).subscribe(
      (response) => {
        this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
      },
      (error) => {
        this.snackBar.open('Error updating profile', 'Close', { duration: 3000 });
      }
    );
  }
}
