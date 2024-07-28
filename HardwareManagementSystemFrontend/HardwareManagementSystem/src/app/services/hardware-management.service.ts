import { Injectable } from '@angular/core';
import { Hardware, Transaction } from '../hardware/issue-return/issue-return.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HardwareManagementService {

  private apiUrl = 'http://localhost:8080/api/hw-details';

  constructor(private http: HttpClient) {}

  getHardwares(): Observable<Hardware[]> {
    return this.http.get<Hardware[]>(`${this.apiUrl}`);
  }

  issueHardware(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/transactions`, transaction);
  }

  returnHardware(transactionId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/transactions/${transactionId}/return`, {});
  }
}
