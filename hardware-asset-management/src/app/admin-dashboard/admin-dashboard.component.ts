import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core'
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  searchQuery: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSearch(): void {
    if (this.searchQuery) {
      this.router.navigate(['/admin-dashboard/search-results'], {
        queryParams: { q: this.searchQuery },
      });
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.snackBar.open('Logged out successfully!', 'Close', { duration: 3000 });
    this.router.navigate(['/login']);
  }
}
