import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../shared/services/request.service';
import { AuthService } from '../../shared/services/auth.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatSnackBar } from '@angular/material/snack-bar';

export interface HWRequest {
  id: number;
  userId: number;
  hwDetailsId: number;
  comments: string;
  expectedReturnDate: Date;
  requestDate: Date;
  status: string;
  isComplete: boolean;
  hwDetails: {
    name: string;
  };
}

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule], // Include MatIconModule
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userId!: number;
  requests: HWRequest[] = [];
  displayedColumns: string[] = ['hwName', 'status', 'isComplete', 'expectedReturnDate', 'requestDate'];

  constructor(
    private requestService: RequestService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userId = currentUser.id;
      this.loadUserRequests();
    } else {
      this.snackBar.open('User not found, please log in again.', 'Close', { duration: 3000 });
    }
  }

  loadUserRequests() {
    this.requestService.getUserRequests(this.userId).subscribe(
      (requests) => {
        this.requests = requests;
      },
      (error) => {
        console.error('Error fetching user requests', error);
        this.snackBar.open('Error fetching user requests', 'Close', { duration: 3000 });
      }
    );
  }
}
