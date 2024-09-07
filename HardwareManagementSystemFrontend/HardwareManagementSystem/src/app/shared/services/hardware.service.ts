import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HWDetails, HWType } from '../../user/request/request.component';

@Injectable({
  providedIn: 'root'
})
export class HardwareService {
  private hwTypesUrl = 'http://localhost:8080/api/hw-types';
  private hwDetailsUrl = 'http://localhost:8080/api/hw-details';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getHwTypes(): Observable<HWType[]> {
    return this.http.get<HWType[]>(this.hwTypesUrl, { headers: this.getAuthHeaders() });
  }

  getHwDetails(): Observable<HWDetails[]> {
    return this.http.get<HWDetails[]>(this.hwDetailsUrl, { headers: this.getAuthHeaders() });
  }

  addHwDetails(hwDetails: HWDetails): Observable<HWDetails> {
    return this.http.post<HWDetails>(this.hwDetailsUrl, hwDetails, { headers: this.getAuthHeaders() });
  }

  updateHwDetails(hwDetails: HWDetails): Observable<HWDetails> {
    return this.http.put<HWDetails>(`${this.hwDetailsUrl}/${hwDetails.id}`, hwDetails, { headers: this.getAuthHeaders() });
  }
  updateHardware(hwDetails: HWDetails): Observable<HWDetails> {
    return this.http.put<HWDetails>(`${this.hwDetailsUrl}/${hwDetails.id}`, hwDetails, { headers: this.getAuthHeaders() });
  }
  createHardware(hwDetails: HWDetails): Observable<HWDetails> {
    return this.http.post<HWDetails>(this.hwDetailsUrl, hwDetails, { headers: this.getAuthHeaders() });
  }
  deleteHwDetails(id: number): Observable<void> {
    return this.http.delete<void>(`${this.hwDetailsUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
  getHardwareByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.hwDetailsUrl}/issued/${userId}`);
  }

  returnMultipleHardware(hardwareIds: string[]): Observable<void> {
    return this.http.post<void>(`${this.hwDetailsUrl}/returnMultiple`, { hardwareIds });
  }
  // Get hardware details by ID ///api/hw-details
  getHardwareById(hardwareId: string): Observable<any> {
    return this.http.get<any>(`${this.hwDetailsUrl}/${hardwareId}`, { headers: this.getAuthHeaders()});
  }

  // Issue hardware to a user
  issueHardware(userId: string, hardwareId: string): Observable<void> {
    return this.http.post<void>(`${this.hwDetailsUrl}/issue`, { userId, hardwareId });
  }

  // Return hardware
  returnHardware(hardwareId: string): Observable<void> {
    return this.http.post<void>(`${this.hwDetailsUrl}/return`, { hardwareId });
  }

  // Get issued hardware by user ID
  getIssuedHardwareByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.hwDetailsUrl}/issued/${userId}`);
  }
}
