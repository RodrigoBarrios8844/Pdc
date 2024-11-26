import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost/backend/routes';


  constructor(private http: HttpClient) {}

  getAll(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}.php`);
  }

  create(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}.php`, data);
  }

  update(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${endpoint}.php`, data);
  }

  delete(endpoint: string, id: any): Observable<any> {
    return this.http.request('delete', `${this.baseUrl}/${endpoint}.php`, {
      body: id
    });
  }
}
