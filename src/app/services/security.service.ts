import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRecord } from './login';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private apiUrl = "http://localhost:8005/auth/login";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }


  login(loginRecord: LoginRecord) {
    return this.http.post(this.apiUrl, JSON.stringify(loginRecord), this.httpOptions)
  } 


  
}
