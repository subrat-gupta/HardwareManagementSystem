import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HardwareService } from '../../../shared/services/hardware.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'issue-hardware-hardware-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './issue-hardware-hardware-dialog.component.html',
  styleUrl: './issue-hardware-hardware-dialog.component.scss'
})
export class IssueHardwareDialogComponent {
  selectedHardwareType: any;
  selectedHardware: any;
  availableHardwareTypes: any[] = [];
  availableHardware: any[] = [];
  hardwareControl = new FormControl('');

  filteredHardware!: Observable<any[]>;

  constructor(
    private hardwareService: HardwareService,
    public dialogRef: MatDialogRef<IssueHardwareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loadHardwareTypes();
  }

  loadHardwareTypes(): void {
    this.hardwareService.getHwTypes().subscribe(
      (data: any) => {
        this.availableHardwareTypes = data;
      },
      (error) => {
        console.error('Error fetching hardware types:', error);
      }
    );
  }

  // When a hardware type is selected, load the available hardware of that type
  onHardwareTypeSelected(hwType: any): void {
    const hwTypeId = hwType.id; // Extract the id from the selected hardware type
    this.hardwareService.getHardwareByType(hwTypeId).subscribe(
      (data: any) => {
        this.availableHardware = data;
        this.filteredHardware = this.hardwareControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterHardware(value || ''))
        );
      },
      (error) => {
        console.error('Error fetching available hardware:', error);
      }
    );
  }

  // Filter hardware based on the product serial number input
  private _filterHardware(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.availableHardware.filter(hardware =>
      hardware.productSerialNumber.toLowerCase().includes(filterValue)
    );
  }

  // When hardware is selected, store it in selectedHardware
  onHardwareSelected(hardware: any): void {
    this.selectedHardware = hardware;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onIssue(): void {
    this.dialogRef.close(this.selectedHardware);
  }
}
