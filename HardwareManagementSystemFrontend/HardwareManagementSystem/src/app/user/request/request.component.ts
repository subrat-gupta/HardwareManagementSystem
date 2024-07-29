import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from '../../shared/services/request.service';
import { SharedModule } from '../../shared/shared.module';
import { HardwareService } from '../../shared/services/hardware.service';

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

export interface HWRequest {
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

  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    private hardwareService: HardwareService
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
  }

  loadHwTypes() {
    this.hardwareService.getHwTypes().subscribe(types => {
      this.hwTypes = types;
    });
  }

  loadHwDetails() {
    this.hardwareService.getHwDetails().subscribe(details => {
      this.hwDetailsList = details;
      this.filteredHwDetailsList = details; // Initially show all
    });
  }

  onTypeChange(hwTypeId: number) {
    this.filteredHwDetailsList = this.hwDetailsList.filter(hw => hw.hwType.id === hwTypeId);
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const formData = this.requestForm.value;
      this.requestService.createRequest(formData).subscribe(response => {
        console.log('Request submitted successfully', response);
        this.requestForm.reset();
      }, error => {
        console.error('Error submitting request', error);
      });
    }
  }
}
