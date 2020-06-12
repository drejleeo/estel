import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  loginServ(userData) {
    return this.http.post<any>(`${baseUrl}/accounts/login/`, userData)
      .pipe(map(
        user => {
          // login successful if there's a jwt token in the response
          if (user && user.key) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        }
      ));
  }

  registerServ(userData) {
    return this.http.post<any>(`${baseUrl}/accounts/register/`, userData)
    .pipe(map(
      user => {
        if (user) {
          return user;
        }
      }
    ));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return this.http.post<any>(`${baseUrl}/accounts/logout/`, {});
  }

}
