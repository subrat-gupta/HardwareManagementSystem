import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HardwareService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getHardware(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.apiUrl}/hardware`, { headers });
  }

  addHardware(hardware: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}/hardware`, hardware, { headers });
  }

  updateHardware(id: number, hardware: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put(`${this.apiUrl}/hardware/${id}`, hardware, {
      headers,
    });
  }

  deleteHardware(id: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.delete(`${this.apiUrl}/hardware/${id}`, { headers });
  }
  // Get available hardware
  getAvailableHardware(): Observable<any[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any[]>(`${this.apiUrl}/hardware/available`, {
      headers,
    });
  }

  // Request to issue hardware
  requestHardware(hardwareId: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}/requests/${hardwareId.hardwareId}`, {
      headers,
    }); // No user ID needed
  }

  // Get hardware issued to employee
  getMyIssuedHardware(userID: number): Observable<any[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any[]>(`${this.apiUrl}/issues/issued/${userID}`, {
      headers,
    });
  }

  // Return issued hardware
  returnHardware(userId: number, hardwareId: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put(
      `${this.apiUrl}/issues/issued/${userId}/${hardwareId}`,
      { headers }
    );
  }

  // Get all requests made by the employee
  getMyRequests(): Observable<any[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any[]>(`${this.apiUrl}/requests/my-requests`, {
      headers,
    });
  }

  getPendingRequests(): Observable<any[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any[]>(`${this.apiUrl}/requests/pending`, { headers });
  }

  approveRequest(requestId: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const issuedByUserId = Number(sessionStorage.getItem('userId'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const url = `${this.apiUrl}/issues/issue/${requestId}/${issuedByUserId}`;
    console.log('Issuing hardware request to:', url);

    return this.http.put(url, {}, { headers, responseType: 'text' as const });
  }

  rejectRequest(requestId: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const url = `${this.apiUrl}/requests/reject/${requestId}`;
    console.log('Reject hardware request to:', url);

    return this.http.put(url, {}, { headers, responseType: 'text' as const });
  }
}
