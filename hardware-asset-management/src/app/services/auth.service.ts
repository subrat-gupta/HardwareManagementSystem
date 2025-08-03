import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
// import { environment } from '../../environments/environment';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<any>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((response: any) => {
          if (response.jwt) {
            this.setToken(response.jwt); // Store the JWT token
          }
        }),
        catchError((error) => {
          console.error('Login failed', error);
          return of(null);
        })
      );
  }

  signup(
    name: string,
    email: string,
    password: string,
    employeeId: string,
    projectId: number
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiUrl}/auth/signup`,
      { name, email, password, employeeId, projectId },
      { headers }
    );
  }

  // Store the JWT token in sessionStorage
  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  // Retrieve the JWT token from sessionStorage
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // Remove the JWT token from sessionStorage (logout)
  removeToken(): void {
    sessionStorage.removeItem('token');
  }
  logout(): void {
    this.removeToken(); // Remove the JWT token
    sessionStorage.clear();
    this.router.navigate(['/login']); // Redirect to login page
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUser(): any {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded Payload:', payload);
      return payload;
    }
    return null;
  }

  // Store user details in sessionStorage
  setUser(user: any): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  // Remove user details from sessionStorage
  removeUser(): void {
    sessionStorage.removeItem('user');
  }

  // Check if the user is an admin
  isAdmin(): boolean {
    const user = this.getUser();
    return user && user.role === 'ADMIN';
  }

  // Check if the user is an employee
  isEmployee(): boolean {
    const user = this.getUser();
    return user && user.role === 'EMPLOYEE';
  }

  // Get the user's name
  getUserName(): string {
    const user = this.getUser();
    return user ? user.username : '';
  }

  // Get the user's employee ID
  getEmpId(): string {
    const user = this.getUser();
    return user ? user.empId : '';
  }

  getId(): string {
    const user = this.getUser();
    return user ? user.id : '';
  }
  updateProfile(
    name: string,
    email: string,
    password: string
  ): Observable<any> {
    const body = { name, email, password };
    return this.http.put(`/api/users/${this.getEmpId()}`, body);
  }

  getUserByEmail(email: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get(`/api/users/${email}`, { headers });
  }
}
