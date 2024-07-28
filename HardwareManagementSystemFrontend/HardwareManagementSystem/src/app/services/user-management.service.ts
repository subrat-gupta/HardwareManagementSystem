import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  User,
  UserType,
} from '../user/user-management/user-management.component';
@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private apiUrl = 'http://localhost:8080/api/users';
  private apiUrl1 = 'http://localhost:8080/api/user-types';
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/addUser`, user);
  }
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
  editUser(user: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/editUser`, user);
  }
  getUserTypes(): Observable<UserType[]> {
    return this.http.get<UserType[]>(this.apiUrl1);
  }
}
