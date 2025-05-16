import { Component, OnInit } from '@angular/core';
import { HardwareService } from 'src/app/services/hardware.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit {
  requestsList: any[] = [];
  displayedColumns: string[] = ['hardware', 'status'];

  constructor(private hardwareService: HardwareService) {}

  ngOnInit() {
    this.hardwareService.getMyRequests().subscribe(data => {
      this.requestsList = data;
    });
  }
}
