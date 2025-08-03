import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HardwareService } from 'src/app/services/hardware.service';

@Component({
  selector: 'app-user-details-dialog',
  templateUrl: './user-details-dialog.component.html',
  styleUrls: ['./user-details-dialog.component.scss'],
})
export class UserDetailsDialogComponent implements OnInit{
  issuedHardware: any[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'type',
    'serialNumber',
    'kpitSerialNumber',
    'partNumber',
    'multiModule',
    'unusable',
    'purchaseDate',
    'createdAt',
    'status',
    'actions',
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hardwareService: HardwareService
  ) {}
  ngOnInit(): void {
    this.loadIssuedHardware();
  }
loadIssuedHardware(): void {
    this.hardwareService.getMyIssuedHardware(this.data.user.userId).subscribe({
      next: (hardware) => (this.issuedHardware = hardware),
      error: (err) => console.error('Error loading hardware', err),
    });
  }
  OnReturn(hardwareId: number): void {
    this.hardwareService
      .returnHardware(this.data.user.userId, hardwareId)
      .subscribe({
        next: () => {
          console.log('Hardware returned');
          this.loadIssuedHardware(); // ✅ Refresh hardware list
        },
        error: (err) => console.error('Return error', err),
      });
  }
}
