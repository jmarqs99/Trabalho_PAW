import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  constructor(private http: HttpClient) { }
  login(nmrCC: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/login', JSON.stringify({
      nmrCC, password
    }), httpOptions);
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
  register(nmrCC: string, password: string,primeiroNome: string, ultimoNome: string, estado: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/utilizador', {
      nmrCC,
      password,
      primeiroNome,
      ultimoNome,
      estado
    })
  }
}
