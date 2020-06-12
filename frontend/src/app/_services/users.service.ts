import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry } from 'rxjs/operators';
import { User } from '../_models/user';

const baseUrl = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersUrl = `${baseUrl}/users/`;

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}${id}`)
    .pipe(
      retry(1),
    );
  }

  getUserDirectUrl(url: string): Observable<User> {
    return this.http.get<User>(url)
    .pipe(
        retry(1),
    );
  }

}
