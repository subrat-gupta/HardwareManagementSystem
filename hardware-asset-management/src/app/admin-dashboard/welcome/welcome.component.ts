import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  userName: string = 'Admin'; // Fetch from backend or AuthService
  empId: string = 'EMP123'; // Fetch from backend or AuthService

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Fetch user details from backend or AuthService
    this.userName = this.authService.getUserName();
    this.empId = this.authService.getEmpId();
  }
}
