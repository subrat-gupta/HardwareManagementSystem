import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HardwareService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getHardware(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.apiUrl}/hardware`, { headers });
  }

  addHardware(hardware: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}/hardware`, hardware, { headers });
  }

  updateHardware(id: number, hardware: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put(`${this.apiUrl}/hardware/${id}`, hardware, {
      headers,
    });
  }

  deleteHardware(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.delete(`${this.apiUrl}/hardware/${id}`, { headers });
  }
  // Get available hardware
  getAvailableHardware(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any[]>(`${this.apiUrl}/hardware/available`, { headers });
  }

  // Request to issue hardware
  requestHardware(hardwareId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}/requests/${hardwareId.hardwareId}`, { headers }); // No user ID needed
  }

  // Get hardware issued to employee
  getMyIssuedHardware(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any[]>(`${this.apiUrl}/issues/issued`, { headers });
  }

  // Return issued hardware
  returnHardware(hardwareId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put(
      `${this.apiUrl}/return/${hardwareId}`,
      {},
      { headers }
    );
  }

  // Get all requests made by the employee
  getMyRequests(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any[]>(`${this.apiUrl}/requests/my-requests`, { headers });
  }

  getPendingRequests(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any[]>(`${this.apiUrl}/requests/pending`, { headers });
  }
}
