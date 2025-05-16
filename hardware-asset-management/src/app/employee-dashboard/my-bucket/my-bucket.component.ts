import { Component, OnInit } from '@angular/core';
import { HardwareService } from 'src/app/services/hardware.service';

@Component({
  selector: 'app-my-bucket',
  templateUrl: './my-bucket.component.html',
  styleUrls: ['./my-bucket.component.scss']
})
export class MyBucketComponent implements OnInit {
  issuedHardwareList: any[] = [];
  displayedColumns: string[] = ['name', 'serialNumber', 'return'];

  constructor(private hardwareService: HardwareService) {}

  ngOnInit() {
    this.hardwareService.getMyIssuedHardware().subscribe(data => {
      this.issuedHardwareList = data;
    });
  }

  returnHardware(hardwareId: number) {
    this.hardwareService.returnHardware(hardwareId).subscribe(() => {
      alert('Hardware returned successfully!');
      this.ngOnInit();
    });
  }
}
