import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HWRequest } from '../../user/request/request.component';

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

  createRequest(request: HWRequest): Observable<HWRequest> {
    return this.http.post<HWRequest>(this.apiUrl, request, { headers: this.getAuthHeaders() });
  }

  getUserRequests(userId: number): Observable<HWRequest[]> {
    return this.http.get<HWRequest[]>(`${this.apiUrl}/user/${userId}`, { headers: this.getAuthHeaders() });
  }

  getAllRequests(): Observable<HWRequest[]> {
    return this.http.get<HWRequest[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }
}
