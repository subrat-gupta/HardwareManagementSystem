import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HWRequestPayload } from '../../user/request/request.component';
import { HWRequest } from '../../user/dashboard/dashboard.component';
;

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

  createRequest(request: HWRequestPayload): Observable<HWRequestPayload> {
    return this.http.post<HWRequestPayload>(this.apiUrl, request, { headers: this.getAuthHeaders() });
  }

  getUserRequests(userId: number): Observable<HWRequest[]> {
    return this.http.get<HWRequest[]>(`${this.apiUrl}/user/${userId}`, { headers: this.getAuthHeaders() });
  }

  getAllRequests(): Observable<HWRequest[]> {
    return this.http.get<HWRequest[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }
}
