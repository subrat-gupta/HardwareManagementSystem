import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  projects: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private projectService: ProjectService, // Service to fetch projects
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      employeeId: ['', Validators.required],
      projectId: [null, Validators.required] // Added project selection
    });
  }

  ngOnInit(): void {
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

  onSignup(): void {
    if (this.signupForm.invalid) {
      return;
    }

    const { name, email, password, employeeId, projectId } = this.signupForm.value;
    this.authService.signup(name, email, password, employeeId, projectId).subscribe(
      (response) => {
        console.log('Signup successful:', response); // ✅ Check if this runs
        this.snackBar.open('Signup successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error during signup:', error);
        this.snackBar.open('Error during signup', 'Close', { duration: 3000 });
      }
    );
  }
}
