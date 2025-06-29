import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-details-dialog',
  templateUrl: './user-details-dialog.component.html',
  styleUrls: ['./user-details-dialog.component.scss']
})
export class UserDetailsDialogComponent {
  displayedColumns: string[] = [
    'id', 'name', 'type', 'serialNumber', 'kpitSerialNumber', 'partNumber',
    'multiModule', 'unusable', 'purchaseDate', 'createdAt', 'status', 'actions'
  ];
   constructor(@Inject(MAT_DIALOG_DATA) public data: { user: any, issuedHardware: any[] }) {}
}
  
