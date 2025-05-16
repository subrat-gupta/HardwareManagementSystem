import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HardwareService } from '../../services/hardware.service';
import { AddEditHardwareDialogComponent } from '../add-edit-hardware-dialog/add-edit-hardware-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.scss']
})
export class HardwareComponent implements OnInit {
  hardware: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'type', 'serialNumber','kpitSerialNumber','partNumber','multiModule','unusable','purchaseDate','createdAt', 'status', 'actions'];

  constructor(
    private hardwareService: HardwareService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadHardware();
  }

  loadHardware(): void {
    this.hardwareService.getHardware().subscribe(
      (response) => {
        this.hardware = response;
      },
      (error) => {
        this.snackBar.open('Error loading hardware', 'Close', { duration: 3000 });
      }
    );
  }

  onAddHardware(): void {
    const dialogRef = this.dialog.open(AddEditHardwareDialogComponent, {
      width: '400px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadHardware();
      }
    });
  }

  onEditHardware(hardware: any): void {
    const dialogRef = this.dialog.open(AddEditHardwareDialogComponent, {
      width: '400px',
      data: { mode: 'edit', hardware }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadHardware();
      }
    });
  }

  onDeleteHardware(hardware: any): void {
    if (confirm('Are you sure you want to delete this hardware?')) {
      this.hardwareService.deleteHardware(hardware.hardwareId).subscribe(
        (response) => {
          this.snackBar.open('Hardware deleted successfully!', 'Close', { duration: 3000 });
          this.loadHardware();
        },
        (error) => {
          this.snackBar.open('Error deleting hardware', 'Close', { duration: 3000 });
        }
      );
    }
  }
}
