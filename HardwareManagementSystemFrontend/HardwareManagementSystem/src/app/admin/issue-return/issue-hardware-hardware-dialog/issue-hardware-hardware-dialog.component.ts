import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'issue-hardware-hardware-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './issue-hardware-hardware-dialog.component.html',
  styleUrl: './issue-hardware-hardware-dialog.component.scss'
})
export class IssueHardwareDialogComponent {
  selectedHardware: any;
  availableHardware = [
    { id: 'hw5', name: 'Printer' },
    { id: 'hw6', name: 'Scanner' },
    // Additional hardware items can be loaded from the backend as well
  ];

  constructor(
    public dialogRef: MatDialogRef<IssueHardwareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onIssue(): void {
    this.dialogRef.close(this.selectedHardware);
  }
}
