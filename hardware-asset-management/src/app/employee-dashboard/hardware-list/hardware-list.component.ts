import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { HardwareService } from 'src/app/services/hardware.service';
export interface Hardware {
  id: number;
  name: string;
  serialNumber: string;
  status: string;
}
@Component({
  selector: 'app-hardware-list',
  templateUrl: './hardware-list.component.html',
  styleUrls: ['./hardware-list.component.scss']
})
export class HardwareListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'serialNumber', 'status', 'request'];
  hardwareList: Hardware[] = [];

  constructor(private hardwareService: HardwareService,private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadAvailableHardware();
  }

  loadAvailableHardware(): void {
    this.hardwareService.getAvailableHardware().subscribe((data) => {
      this.hardwareList = data;
    });
  }

  requestHardware(hardware: number): void {
    this.hardwareService.requestHardware(hardware).subscribe(() => {
      this.snackBar.open('Hardware request submitted!', 'OK', { duration: 2000 });
    });
  }
}
