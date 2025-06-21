import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { HardwareService } from 'src/app/services/hardware.service';

@Component({
  selector: 'app-hardware-requests',
  templateUrl: './hardware-requests.component.html',
  styleUrls: ['./hardware-requests.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('200ms ease-in-out')),
    ]),
  ]
})

export class HardwareRequestsComponent implements OnInit {

  constructor(private hardwareService: HardwareService) {}
  pendingRequests: any[] = [];
  expandedRow: any | null = null;
  isExpansionRow = (_: number, row: any) => row.hasOwnProperty('expandedDetailRow');
  

  displayedColumns: string[] = [
    'request_id', 'createdAt', 'purpose', 'requestDate',
    'requiredFromDate', 'requiredToDate', 'status', 'updatedAt',
    'hardware', 'project', 'user'
  ];

  ngOnInit(): void {
this.hardwareService.getPendingRequests().subscribe(requests => {
  this.pendingRequests = requests.flatMap(request => [
    request,
    { expandedDetailRow: true, detail: request }
  ]);
});
}

}
