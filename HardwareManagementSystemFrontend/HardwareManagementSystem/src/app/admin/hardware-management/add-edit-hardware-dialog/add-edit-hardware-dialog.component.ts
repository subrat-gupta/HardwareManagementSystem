import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HardwareService } from '../../../shared/services/hardware.service'; // Assuming you have a HardwareService
import { HWDetails, HWType } from '../../../user/request/request.component'; // Adjust imports as necessary
import { SharedModule } from '../../../shared/shared.module';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'add-edit-hardware-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-edit-hardware-dialog.component.html',
  styleUrls: ['./add-edit-hardware-dialog.component.scss']
})
export class AddEditHardwareDialogComponent implements OnInit {
  hardwareForm!: FormGroup;
  hwTypes: HWType[] = [];
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private hardwareService: HardwareService,
    private dialogRef: MatDialogRef<AddEditHardwareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HWDetails | null
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data;
    this.loadHardwareTypes();

    this.hardwareForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      partNumber: [this.data?.partNumber || '', Validators.required],
      productSerialNumber: [this.data?.productSerialNumber || '', Validators.required],
      kpitSerialNo: [this.data?.kpitSerialNo || '', Validators.required],
      isIssued: [this.data?.isIssued || false],
      isUnusable: [this.data?.isUnusable || false],
      inMultiModule: [this.data?.inMultiModule || false],
      released: [this.data?.released || false],
      hwTypeId: [this.data?.hwType?.id || '', Validators.required]
    });
  }

  loadHardwareTypes() {
    this.hardwareService.getHwTypes().subscribe(types => {
      this.hwTypes = types;
    });
  }

  onSave() {
    if (this.hardwareForm.invalid) {
      return;
    }

    const formValue = this.hardwareForm.value;
    if (this.isEditMode) {
      // Edit mode
      const updatedHardware = { ...this.data, ...formValue };
      this.hardwareService.updateHardware(updatedHardware).subscribe(() => {
        this.dialogRef.close(updatedHardware);
      });
    } else {
      // Create mode
      this.hardwareService.createHardware(formValue).subscribe((newHardware) => {
        this.dialogRef.close(newHardware);
      });
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
