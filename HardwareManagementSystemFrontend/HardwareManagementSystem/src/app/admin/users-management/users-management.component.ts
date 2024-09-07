import { Component, ViewChild } from '@angular/core';
import { UserManagementService } from '../../shared/services/user-management.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserEditFormComponent } from '../user-edit-form/user-edit-form.component';
import { SharedModule } from '../../shared/shared.module';

export interface UserType {
  id: number;
  description: string;
}

export interface User {
  id: number;
  kpitEmpId: string;
  password: string;
  name: string;
  email: string;
  contactNumber: string;
  location: string;
  isActive: boolean;
  userTypeId: number;
  userType: UserType;
}

@Component({
  selector: 'users-management',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.scss'
})
export class UsersManagementComponent {
  displayedColumns: string[] = [
    'id',
    'kpitEmpId',
    'name',
    'contactNumber',
    'email',
    'location',
    'isActive',
    'userType',
    'actions',
  ];
  dataSource = new MatTableDataSource<User>();
  userTypes: UserType[] = [];
  
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userManagementService: UserManagementService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchUserTypes();
  }

  fetchUsers() {
    this.userManagementService.getUsers().subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
    });
  }

  fetchUserTypes() {
    this.userManagementService.getUserTypes().subscribe(userTypes => {
      this.userTypes = userTypes;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearSearch(input: HTMLInputElement) {
    input.value = '';
    this.applyFilter({ target: input } as any);
  }

  addUser() {
    const dialogRef = this.dialog.open(UserEditFormComponent, {
      width: '600px',
      data: {
        user: {},
        userTypes: this.userTypes
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userManagementService.addUser(result).subscribe(() => {
          this.fetchUsers(); // Refresh the user list
        });
      }
    });
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(UserEditFormComponent, {
      width: '400px',
      data: {
        user: user,
        userTypes: this.userTypes
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userManagementService.editUser(result).subscribe(() => {
          this.fetchUsers(); // Refresh the user list
        });
      }
    });
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userManagementService.deleteUser(userId).subscribe(() => {
        this.fetchUsers(); // Refresh the user list
      });
    }
  }

  blockUser(userId: number) {
    // Logic to block a user
  }
}