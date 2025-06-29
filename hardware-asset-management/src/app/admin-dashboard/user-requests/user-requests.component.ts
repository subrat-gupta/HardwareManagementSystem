import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.scss']
})
export class UserRequestsComponent implements OnInit {
  requests: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.userService.getUserRequests().subscribe(
      (response) => {
        this.requests = response;
      },
      (error) => {
        this.snackBar.open('Error loading user requests', 'Close', { duration: 3000 });
      }
    );
  }

  onApprove(request: any): void {
    this.userService.approveUser(request.id).subscribe(
      (response) => {
        this.snackBar.open('User approved successfully!', 'Close', { duration: 3000 });
        this.loadRequests();
        this.cdr.detectChanges();
      },
      (error) => {
        this.snackBar.open('Error approving user', 'Close', { duration: 3000 });
      }
    );
  }

  onReject(request: any): void {
    this.userService.rejectUser(request.id).subscribe(
      (response) => {
        this.snackBar.open('User rejected successfully!', 'Close', { duration: 3000 });
        this.loadRequests();
        this.cdr.detectChanges();
      },
      (error) => {
        this.snackBar.open('Error rejecting user', 'Close', { duration: 3000 });
      }
    );
  }
}
