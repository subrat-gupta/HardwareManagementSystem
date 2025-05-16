import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HardwareService } from 'src/app/services/hardware.service';

@Component({
  selector: 'app-request-hardware',
  templateUrl: './request-hardware.component.html',
  styleUrls: ['./request-hardware.component.scss']
})
export class RequestHardwareComponent {
  requestForm: FormGroup;

  constructor(private fb: FormBuilder, private hardwareService: HardwareService) {
    this.requestForm = this.fb.group({
      hardwareId: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  submitRequest() {
    if (this.requestForm.valid) {
      this.hardwareService.requestHardware(this.requestForm.value).subscribe(() => {
        alert('Request submitted successfully!');
        this.requestForm.reset();
      });
    }
  }
}
