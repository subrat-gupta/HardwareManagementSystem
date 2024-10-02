import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';

import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { HardwareService } from '../../shared/services/hardware.service';
import { IssueHardwareDialogComponent } from './issue-hardware-hardware-dialog/issue-hardware-hardware-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersManagementComponent } from '../users-management/users-management.component';
import { UserManagementService } from '../../shared/services/user-management.service';
@Component({
  selector: 'issue-return',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './issue-return.component.html',
  styleUrl: './issue-return.component.scss',
})
export class IssueReturnComponent {
  user: any = null;
  hardware: any = null;
  issuedHardware = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['select', 'id', 'name', 'action'];
  selection = new SelectionModel<any>(true, []);

  constructor(
    private HardwareService: HardwareService,
    private UserManagementService: UserManagementService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  // searchUser(event: any): void {
  //   const userId: number = event.target.value;
  //   if (userId) {
  //     this.UserManagementService.getUserById(userId).subscribe(
  //       (data) => {
  //         // Map the data to your user object structure
  //         this.user = {
  //           id: data.id,
  //           EmpId: data.kpitEmpId,
  //           name: data.name,
  //           contactNumber: data.contactNumber,
  //           email: data.email,
  //           isActive: data.isActive,
  //           location: data.location,
  //           userType: data.userType ? data.userType.description : '', // Map userType if present
  //         };

  //         // Reset issuedHardware if applicable
  //         this.issuedHardware.data = [];
  //       },
  //       (error) => {
  //         console.error('Error fetching user details:', error);
  //         this.user = null;
  //         this.issuedHardware.data = [];
  //       }
  //     );
  //   } else {
  //     this.user = null;
  //     this.issuedHardware.data = [];
  //   }

  // }
  searchUser(event: any): void {
    const userId: number = event.target.value;

    if (userId) {
      // Fetch the user details first
      this.UserManagementService.getUserById(userId).subscribe(
        (userData) => {
          // Map the data to your user object structure
          this.user = {
            id: userData.id,
            EmpId: userData.kpitEmpId,
            name: userData.name,
            contactNumber: userData.contactNumber,
            email: userData.email,
            isActive: userData.isActive,
            location: userData.location,
            userType: userData.userType ? userData.userType.description : '', // Map userType if present
          };

          // Once user details are fetched, fetch issued hardware for this user
          this.HardwareService.getIssuedHardwareByEmpId(userId).subscribe(
            (issuedHardwareData) => {
              this.issuedHardware.data = issuedHardwareData; // Update the issuedHardware data
            },
            (hardwareError) => {
              console.error('Error fetching issued hardware:', hardwareError);
              this.issuedHardware.data = []; // Reset if there's an error fetching issued hardware
            }
          );
        },
        (userError) => {
          console.error('Error fetching user details:', userError);
          this.user = null; // Reset user data on error
          this.issuedHardware.data = []; // Reset issued hardware data on error
        }
      );
    } else {
      // Reset user and hardware data if userId is not provided
      this.user = null;
      this.issuedHardware.data = [];
    }
  }

  searchHardware(event: any): void {
    const hardwareId: string = event.target.value;
    if (hardwareId) {
      this.HardwareService.getHardwareById(hardwareId).subscribe(
        (hardware) => {
          this.hardware = hardware; // Store the hardware details
          this.snackBar.open('Hardware details fetched successfully', 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Error fetching hardware details', error);
          this.snackBar.open('Failed to fetch hardware details', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.hardware = null;
    }
  }

  issueHardware(): void {
    const dialogRef = this.dialog.open(IssueHardwareDialogComponent, {
      width: '300px',
      data: { userId: this.user.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.HardwareService.issueHardware(this.user.id, result.id).subscribe(
          () => {
            this.searchUser({ target: { value: this.user.id } });
          }
        );
      }
    });
  }

  returnHardware(element: any): void {
    this.HardwareService.returnHardware(element.id).subscribe(() => {
      this.issuedHardware.data = this.issuedHardware.data.filter(
        (item) => item.id !== element.id
      );
      this.selection.clear();
    });
  }

  returnSelectedHardware(): void {
    const selectedIds = this.selection.selected.map((item) => item.id);
    selectedIds.forEach((id) => {
      this.returnHardware({ id });
    });
  }

  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.issuedHardware.data.forEach((row) => this.selection.select(row));
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.issuedHardware.data.length;
    return numSelected === numRows;
  }

  // Check if any hardware is selected
  isAnySelected(): boolean {
    return this.selection.selected.length > 0;
  }
  toggleSelection(element: any): void {
    this.selection.toggle(element);
  }
}
