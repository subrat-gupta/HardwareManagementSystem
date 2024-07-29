import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserType } from '../../admin/users-management/users-management.component';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private apiUrl = 'http://localhost:8080/api/users';
  private apiUrl1 = 'http://localhost:8080/api/user-types';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/addUser`, user, { headers: this.getAuthHeaders() });
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`, { headers: this.getAuthHeaders() });
  }

  editUser(user: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/editUser`, user, { headers: this.getAuthHeaders() });
  }

  getUserTypes(): Observable<UserType[]> {
    return this.http.get<UserType[]>(this.apiUrl1, { headers: this.getAuthHeaders() });
  }
}
