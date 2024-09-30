import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../shared/services/request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';  
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'request',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  requests: any[] = [];
  filteredRequests: any[] = [];  
  searchTerm: string = '';
  showApproved = false;
  showPending = false;
  showRejected = false;
  startDate: Date | null = null;
  endDate: Date | null = null;
  displayedColumns: string[] = ['user', 'hwDetails', 'comments', 'requestDate', 'expectedReturnDate', 'status', 'actions'];

  constructor(
    private requestService: RequestService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    this.requestService.getAllRequests().subscribe(
      (data) => {
        this.requests = data;
        this.filteredRequests = data; 
      },
      (error) => {
        console.error('Error fetching requests', error);
        this.snackBar.open('Failed to load requests', 'Close', { duration: 3000 });
      }
    );
  }

  approveRequest(requestId: number) {
    this.requestService.approveRequest(requestId).subscribe(
      () => {
        this.snackBar.open('Request approved successfully', 'Close', { duration: 3000 });
        this.loadRequests();
      },
      (error) => {
        console.error('Error approving request', error);
        this.snackBar.open('Failed to approve request', 'Close', { duration: 3000 });
      }
    );
  }

  rejectRequest(requestId: number) {
    this.requestService.rejectRequest(requestId).subscribe(
      () => {
        this.snackBar.open('Request rejected successfully', 'Close', { duration: 3000 });
        this.loadRequests();
      },
      (error) => {
        console.error('Error rejecting request', error);
        this.snackBar.open('Failed to reject request', 'Close', { duration: 3000 });
      }
    );
  }

  issueRequest(requestId: number) {
    this.router.navigate(['/admin-dashboard/issue-return'], { queryParams: { requestId } });
  }

  // Method to filter requests by search term, status, and date range
  applyFilter() {
    this.filteredRequests = this.requests.filter((request) => {
      const matchesSearch =
        request.user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        request.user.id.toString().includes(this.searchTerm);
  
      const matchesApproved = this.showApproved && request.status === 'APPROVED';
      const matchesPending = this.showPending && request.status === 'PENDING';
      const matchesRejected = this.showRejected && request.status === 'REJECTED';
  
      const requestDate = new Date(request.requestDate);
      const matchesDateRange =
        (!this.startDate || requestDate >= this.startDate) &&
        (!this.endDate || requestDate <= this.endDate);
  
      return (
        matchesSearch &&
        matchesDateRange &&
        (!this.showApproved && !this.showPending && !this.showRejected) ||
        matchesApproved ||
        matchesPending ||
        matchesRejected
      );
    });
  }
  
  clearFilters() {
    this.searchTerm = '';
    this.showApproved = false;
    this.showPending = false;
    this.showRejected = false;
    this.startDate = null;
    this.endDate = null;
    this.applyFilter(); // Reset the filter
  }
  
}
