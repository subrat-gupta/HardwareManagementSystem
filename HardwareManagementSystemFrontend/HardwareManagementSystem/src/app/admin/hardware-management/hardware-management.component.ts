import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HWDetails, HWType } from '../../user/request/request.component';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HardwareService } from '../../shared/services/hardware.service';
import { AddEditHardwareDialogComponent } from './add-edit-hardware-dialog/add-edit-hardware-dialog.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'hardware-management',
  templateUrl: './hardware-management.component.html',
  standalone: true,
  imports: [CommonModule, SharedModule],
  styleUrls: ['./hardware-management.component.scss']
})
export class HardwareManagementComponent implements OnInit {
  hwDetails: HWDetails[] = [];
  hwTypes: HWType[] = [];
  displayedColumns: string[] = ['name', 'description', 'partNumber', 'productSerialNumber', 'hwType', 'actions'];

  constructor(private hardwareService: HardwareService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadHardwareDetails();
    this.loadHardwareTypes();
  }

  loadHardwareDetails(): void {
    this.hardwareService.getHwDetails().subscribe(
      (data) => {
        this.hwDetails = data;
      },
      (error) => {
        this.snackBar.open('Failed to load hardware details', 'Close', { duration: 3000 });
      }
    );
  }

  loadHardwareTypes(): void {
    this.hardwareService.getHwTypes().subscribe(
      (data) => {
        this.hwTypes = data;
      },
      (error) => {
        this.snackBar.open('Failed to load hardware types', 'Close', { duration: 3000 });
      }
    );
  }

  openAddEditForm(hwDetails?: HWDetails): void {
    const dialogRef = this.dialog.open(AddEditHardwareDialogComponent, {
      data: {
        hwDetails: hwDetails || null,
        hwTypes: this.hwTypes
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadHardwareDetails(); // Reload after add/edit
      }
    });
  }

  editHardware(hwDetails: HWDetails): void {
    this.openAddEditForm(hwDetails);
  }

  deleteHardware(id: number): void {
    // Confirm deletion
    if (confirm('Are you sure you want to delete this hardware?')) {
      this.hardwareService.deleteHwDetails(id).subscribe(
        () => {
          this.snackBar.open('Hardware deleted successfully', 'Close', { duration: 3000 });
          this.loadHardwareDetails(); // Reload after delete
        },
        (error) => {
          this.snackBar.open('Failed to delete hardware', 'Close', { duration: 3000 });
        }
      );
    }
  }
}
