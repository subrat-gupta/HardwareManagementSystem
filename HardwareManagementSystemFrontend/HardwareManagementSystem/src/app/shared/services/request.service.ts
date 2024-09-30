import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HWRequestPayload } from '../../user/request/request.component';
import { HWRequest } from '../../user/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiUrl = 'http://localhost:8080/api/requests';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // User creates a new request
  createRequest(request: HWRequestPayload): Observable<HWRequestPayload> {
    return this.http.post<HWRequestPayload>(this.apiUrl, request, { headers: this.getAuthHeaders() });
  }

  // User gets all their requests
  getUserRequests(userId: number): Observable<HWRequest[]> {
    return this.http.get<HWRequest[]>(`${this.apiUrl}/user/${userId}`, { headers: this.getAuthHeaders() });
  }

  // Admin gets all requests from all users
  getAllRequests(): Observable<HWRequest[]> {
    return this.http.get<HWRequest[]>(`${this.apiUrl}/all`, { headers: this.getAuthHeaders() });
  }

  // Admin approves a request by request ID
  approveRequest(requestId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve/${requestId}`, null, { headers: this.getAuthHeaders() });
  }

  // Admin rejects a request by request ID
  rejectRequest(requestId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reject/${requestId}`, null, { headers: this.getAuthHeaders() });
  }
}
