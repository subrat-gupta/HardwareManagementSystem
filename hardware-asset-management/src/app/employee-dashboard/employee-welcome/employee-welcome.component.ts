import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-employee-welcome',
  templateUrl: './employee-welcome.component.html',
  styleUrls: ['./employee-welcome.component.scss']
})
export class EmployeeWelcomeComponent implements OnInit {
  userName: string = 'Admin'; // Fetch from backend or AuthService
  empId: string = 'EMP123'; // Fetch from backend or AuthService

  constructor(private authService: AuthService) {}

 ngOnInit(): void {
    // Fetch user details from backend or AuthService
    this.userName = this.authService.getUserName();
    this.empId = this.authService.getEmpId();
  }
}
