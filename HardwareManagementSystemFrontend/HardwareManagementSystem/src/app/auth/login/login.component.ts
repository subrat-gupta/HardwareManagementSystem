import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword: boolean = true;
  error: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });
  }

  login() {
    let loginInfo = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.authService.login(loginInfo).subscribe({
      next: (response) => {
        if (response.jwt) {
          const user = this.authService.getCurrentUser();
          if (user.userType.id === 1) {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/user-dashboard']);
          }
        } else if (response.message) {
          this.error = response.message;
        }
      },
      error: (error) => {
        if (error.status === 403) {
          this.error = error.error.message || 'You are not verified yet. Please contact support at +1-234-567-890.';
        } else {
          this.error = 'Login failed. Please check your credentials and try again.';
        }
      }
    });
  }
}