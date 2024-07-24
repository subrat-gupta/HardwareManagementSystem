import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  hidePwdContent: boolean = true;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private snackBar: MatSnackBar) {
    this.registerForm = fb.group({
      racfId: fb.control('', [Validators.required]),
      saltPassword: fb.control('', [Validators.required]),
      password: fb.control('', [Validators.required]),
      name: fb.control('', [Validators.required]),
      emailId: fb.control('', [Validators.required, Validators.email]),
      contactNumber: fb.control('', [Validators.required]),
      location: fb.control('', [Validators.required]),
      isActive: fb.control(false),
      userTypeId: fb.control('', [Validators.required])
    });
  }

  register() {
    let user = {
      racfId: this.registerForm.get('racfId')?.value,
      saltPassword: this.registerForm.get('saltPassword')?.value,
      password: this.registerForm.get('password')?.value,
      name: this.registerForm.get('name')?.value,
      emailId: this.registerForm.get('emailId')?.value,
      contactNumber: this.registerForm.get('contactNumber')?.value,
      location: this.registerForm.get('location')?.value,
      isActive: this.registerForm.get('isActive')?.value,
      userTypeId: this.registerForm.get('userTypeId')?.value,
    };
    this.apiService.register(user).subscribe({
      next:(res)=>{
      this.snackBar.open('User registered successfully',"OK");
      }
    })
  }
}
