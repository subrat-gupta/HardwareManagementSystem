import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HardwareService } from 'src/app/services/hardware.service';

@Component({
  selector: 'app-hardware-requests',
  templateUrl: './hardware-requests.component.html',
  styleUrls: ['./hardware-requests.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('200ms ease-in-out')),
    ]),
  ]
})

export class HardwareRequestsComponent implements OnInit {

  constructor(private hardwareService: HardwareService,private snackBar: MatSnackBar) {
    
  }
  pendingRequests: any[] = [];
  expandedRow: any | null = null;
  isExpansionRow = (_: number, row: any) => row.hasOwnProperty('expandedDetailRow');
  

  displayedColumns: string[] = [
    'request_id', 'createdAt', 'purpose', 'requestDate',
    'requiredFromDate', 'requiredToDate', 'status', 'updatedAt',
    'hardware', 'project', 'user','actions'
  ];

  ngOnInit(): void {
    this.loadRequests();
}

loadRequests(){
this.hardwareService.getPendingRequests().subscribe(requests => {
  this.pendingRequests = requests.flatMap(request => [
    request,
    { expandedDetailRow: true, detail: request }
  ]);
});
}

approve(row: any) {
  console.log('Approving request:', row.requestId);

  this.hardwareService.approveRequest(row.requestId).subscribe({
    next: (response) => {
      const result = response;
      this.loadRequests();
      this.snackBar.open('Request Approved!', 'Close', { duration: 3000 });
      // You can now use `result` as needed
      // e.g., show a message or update the UI
    },
    error: (error) => {
      console.error('Error during approval:', error);
    }
  });
}


reject(row: any) {
   console.log('Rejecting request:', row.requestId);

  this.hardwareService.rejectRequest(row.requestId).subscribe({
    next: (response) => {
      const result = response;
      this.loadRequests();
      this.snackBar.open('Request Rejected!', 'Close', { duration: 3000 });
      // You can now use `result` as needed
      // e.g., show a message or update the UI
    },
    error: (error) => {
      console.error('Error during approval:', error);
    }
  });
}

edit(row: any) {
  // Logic to reject
  console.log('Edit request:', row.requestId);
  // Call to backend here
}

}
