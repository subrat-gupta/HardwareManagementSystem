import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword: boolean = true;
  error: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      kpitEmpId: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      contactNumber: this.fb.control('', [Validators.required]),
      location: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    });
  }

  register() {
    let userInfo = {
      name: this.registerForm.get('name')?.value,
      kpitEmpId: this.registerForm.get('kpitEmpId')?.value,
      email: this.registerForm.get('email')?.value,
      contactNumber: this.registerForm.get('contactNumber')?.value,
      location: this.registerForm.get('location')?.value,
      password: this.registerForm.get('password')?.value,
    };

    this.authService.register(userInfo).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.error = 'Registration failed. Please try again.';
      }
    });
  }
}
