import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  token!: string;
  private apiUrl = "http://localhost:8005/api/users";
  header!: HttpHeaders;
  headers!:any;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
     this.token = this.localStorageService.getItem('token')!;
     this.header = new HttpHeaders().set('Authorization', 'Bearer ' + this.token); // may be localStorage/sessionStorage
     this.headers = { headers: this.header };
   }

  getUserRecords(): Observable<any> {
    return this.http.get(this.apiUrl, this.headers);
  }

  uploadfile(file: File) {
    let formParams = new FormData();
    formParams.append('file', file)
    return this.http.post(this.apiUrl, formParams, this.headers)
  } 


}
