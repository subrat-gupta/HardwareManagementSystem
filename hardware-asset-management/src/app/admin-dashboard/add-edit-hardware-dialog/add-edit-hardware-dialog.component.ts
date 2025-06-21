import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HardwareService } from 'src/app/services/hardware.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-add-edit-hardware-dialog',
  templateUrl: './add-edit-hardware-dialog.component.html',
  styleUrls: ['./add-edit-hardware-dialog.component.scss'],
})
export class AddEditHardwareDialogComponent implements OnInit {
  hardwareForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditHardwareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hardwareService: HardwareService,
    private snackBar: MatSnackBar
  ) {
this.hardwareForm = this.fb.group({
  name: ['', Validators.required],
  type: ['', Validators.required],
  serialNumber: ['', Validators.required],
  kpitSerialNumber: [''],
  partNumber: [''],
  multiModule: [false],
  unusable: [false],
  purchaseDate: [''],
  status: ['', Validators.required]
});

  }

  ngOnInit(): void {
    if (this.data.mode === 'edit') {
      this.hardwareForm.patchValue(this.data.hardware);
    }
  }

  onSave(): void {
    if (this.hardwareForm.invalid) {
      return;
    }

    const hardware = this.hardwareForm.value;
    if (this.data.mode === 'add') {
      this.hardwareService.addHardware(hardware).subscribe(
        (response) => {
          this.snackBar.open('Hardware added successfully!', 'Close', {
            duration: 3000,
          });
          this.dialogRef.close(true);
        },
        (error) => {
          this.snackBar.open('Error adding hardware', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.hardwareService
        .updateHardware(this.data.hardware.hardwareId, hardware)
        .subscribe(
          (response) => {
            this.snackBar.open('Hardware updated successfully!', 'Close', {
              duration: 3000,
            });
            this.dialogRef.close(true);
          },
          (error) => {
            this.snackBar.open('Error updating hardware', 'Close', {
              duration: 3000,
            });
          }
        );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
