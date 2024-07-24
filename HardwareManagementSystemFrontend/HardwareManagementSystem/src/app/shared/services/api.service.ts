import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl:string="http://localhost:8080/api/users";
  constructor(private http: HttpClient) { }
  register(user:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
   return this.http.post(`${this.baseUrl}`,user,{headers});
  }
}
