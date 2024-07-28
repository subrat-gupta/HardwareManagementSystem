import { Component, OnInit } from '@angular/core';
import { HardwareManagementService } from '../../services/hardware-management.service';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
export interface Hardware {
  id: number;
  name: string;
  type: string;
  status: 'available' | 'issued';
}
export interface Transaction {
  id: number;
  hardwareId: number;
  userId: number;
  issueDate: Date;
  returnDate: Date | null;
}

@Component({
  selector: 'issue-return',
  templateUrl: './issue-return.component.html',
  styleUrl: './issue-return.component.scss'
})
export class IssueReturnComponent {
  user: any;
  issuedHardware = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['select', 'id', 'name', 'action'];
  selection = new SelectionModel<any>(true, []);

  searchUser(event: any) {
    const userId = event.target.value;
    // Implement search logic to get user details and issued hardware
    // Example:
    this.user = { id: userId, name: 'Subrat', email: 'subrat@kpit.com' };
    this.issuedHardware.data = [
      { id: 1, name: 'Laptop' },
      { id: 2, name: 'Monitor' },
    ];
  }

  returnHardware(hardware: any) {
    // Implement return hardware logic
    console.log('Returning hardware:', hardware);
  }

  returnSelectedHardware() {
    const selectedHardware = this.selection.selected;
    // Implement return selected hardware logic
    console.log('Returning selected hardware:', selectedHardware);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.issuedHardware.data.length;
    return numSelected === numRows;
  }

  isAnySelected() {
    return this.selection.selected.length > 0 && !this.isAllSelected();
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.issuedHardware.data.forEach(row => this.selection.select(row));
  }

  toggleSelection(row: any) {
    this.selection.toggle(row);
  }
}
