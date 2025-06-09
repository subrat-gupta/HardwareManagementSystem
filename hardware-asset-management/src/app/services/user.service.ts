import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error("No token found, user might not be authenticated.");
      return of(null); // Prevent making an API call if there's no token
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.get(`${this.apiUrl}/users`, { headers }).pipe(
      catchError((error) => {
        console.error("Error fetching users:", error);
        return throwError(error);
      })
    );
  }
  

  addUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/users`, user, { headers });
  }

  updateUser(id: number, user: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.apiUrl}/users/${id}`, user, { headers });
  }

  deleteUser(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.delete(`${this.apiUrl}/users/${id}`, { headers });
  }

  getUserRequests(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(`${this.apiUrl}/requests/pending`, { headers });
  }

  approveUser(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/user-requests/${id}/approve`, {});
  }

  rejectUser(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/user-requests/${id}/reject`, {});
  }
  getUserByEmail(email: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(`${this.apiUrl}/users/${email}`, { headers });
  }
}
