import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UserManagementService } from '../../services/user-management.service';
import { RegisterComponent } from '../../auth/register/register.component';
import { UserEditFormComponent } from '../user-edit-form/user-edit-form.component';
export interface UserType {
  id: number;
  description: string;
}
export interface User {
  id: number;
  contactNumber: string;
  emailId: string;
  isActive: boolean;
  location: string;
  name: string;
  password: string;
  racfId: string;
  saltPassword: string;
  userType: UserType;
}

// const USER_DATA: User[] = [
//   {

//     contactNumber: '123-456-7890',
//     emailId: 'john.doe@example.com',
//     isActive: true,
//     location: 'New York',
//     name: 'John Doe',
//     password: 'password123',
//     racfId: 'JD123',
//     saltPassword: 'salt123',
//     userType: 'Admin',
//   },
//   {

//     contactNumber: '987-654-3210',
//     emailId: 'jane.doe@example.com',
//     isActive: false,
//     location: 'Los Angeles',
//     name: 'Jane Doe',
//     password: 'password456',
//     racfId: 'JD456',
//     saltPassword: 'salt456',
//     userType: 'User',
//   },
//   {

//     contactNumber: '555-666-7777',
//     emailId: 'sam.smith@example.com',
//     isActive: true,
//     location: 'Chicago',
//     name: 'Sam Smith',
//     password: 'password789',
//     racfId: 'SS789',
//     saltPassword: 'salt789',
//     userType: 'User',
//   },
//   {

//     contactNumber: '111-222-3333',
//     emailId: 'alice.jones@example.com',
//     isActive: true,
//     location: 'Houston',
//     name: 'Alice Jones',
//     password: 'password101',
//     racfId: 'AJ101',
//     saltPassword: 'salt101',
//     userType: 'Admin',
//   },
//   {

//     contactNumber: '444-555-6666',
//     emailId: 'bob.brown@example.com',
//     isActive: false,
//     location: 'Phoenix',
//     name: 'Bob Brown',
//     password: 'password202',
//     racfId: 'BB202',
//     saltPassword: 'salt202',
//     userType: 'User',
//   },
// ];

@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'contactNumber',
    'emailId',
    'location',
    'racfId',
    'password',
    'saltPassword',
    'userType',
    'isActive',
    'actions',
  ];
  //dataSource = new MatTableDataSource(USER_DATA);
  dataSource = new MatTableDataSource<User>();
  userTypes: UserType[] = [];
  @ViewChild(MatSort)
  sort!: MatSort;
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
      //this.dataSource.data = users;
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
      //data: {} as User,
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
