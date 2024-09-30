import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from '../../shared/services/request.service';
import { SharedModule } from '../../shared/shared.module';
import { HardwareService } from '../../shared/services/hardware.service';
import { AuthService } from '../../shared/services/auth.service';

export interface HWType {
  id: number;
  description: string;
}

export interface HWDetails {
  id: number;
  name: string;
  description: string;
  hwType: HWType;
  inMultiModule: boolean;
  isIssued: boolean;
  isUnusable: boolean;
  kpitSerialNo: string;
  partNumber: string;
  productSerialNumber: string;
  released: boolean;
}

export interface HWRequestPayload {
  userId: number;
  hwDetailsId: number;
  comments: string;
  expectedReturnDate: Date;
}

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  requestForm: FormGroup;
  hwTypes: HWType[] = [];
  hwDetailsList: HWDetails[] = [];
  filteredHwDetailsList: HWDetails[] = [];
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    private hardwareService: HardwareService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.requestForm = this.fb.group({
      hwTypeId: ['', Validators.required],
      hwDetailsId: ['', Validators.required],
      comments: ['', Validators.required],
      expectedReturnDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadHwTypes();
    this.loadHwDetails();
    const currentUser = this.authService.getCurrentUser();
    this.userId = currentUser ? currentUser.id : null;
  }

  loadHwTypes() {
    this.hardwareService.getHwTypes().subscribe(
      types => {
        this.hwTypes = types;
      },
      error => {
        console.error('Error loading hardware types', error);
        this.snackBar.open('Error loading hardware types', 'Close', { duration: 3000 });
      }
    );
  }

  loadHwDetails() {
    this.hardwareService.getHwDetails().subscribe(
      details => {
        this.hwDetailsList = details;
        this.filteredHwDetailsList = details;
      },
      error => {
        console.error('Error loading hardware details', error);
        this.snackBar.open('Error loading hardware details', 'Close', { duration: 3000 });
      }
    );
  }

  onTypeChange(hwTypeId: number) {
    this.filteredHwDetailsList = this.hwDetailsList.filter(hw => hw.hwType.id === hwTypeId);
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const formData = this.requestForm.value;
      const requestPayload: HWRequestPayload = {
        userId: this.userId,
        hwDetailsId: formData.hwDetailsId,
        comments: formData.comments,
        expectedReturnDate: formData.expectedReturnDate
      };

      this.requestService.createRequest(requestPayload).subscribe(
        response => {
          console.log('Request submitted successfully', response);
          this.snackBar.open('Request submitted successfully', 'Close', { duration: 3000 });
          this.requestForm.reset();
        },
        error => {
          console.error('Error submitting request', error);
          this.snackBar.open('Error submitting request', 'Close', { duration: 3000 });
        }
      );
    }
  }
}
