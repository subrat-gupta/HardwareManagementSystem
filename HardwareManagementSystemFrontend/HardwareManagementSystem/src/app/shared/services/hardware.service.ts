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
}
