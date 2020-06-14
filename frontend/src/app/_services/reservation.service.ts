import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ReservationFull } from '../_models/reservation';

const baseUrl = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  myReservUrl = `${baseUrl}/reservations/`;

  constructor(private http: HttpClient) { }

  getReservations() {
    return this.http.get<any>(this.myReservUrl)
    .pipe(
      retry(1),
    );
  }

  addReservation(reserv): Observable<ReservationFull> {
    return this.http.post<ReservationFull>(this.myReservUrl, JSON.stringify(reserv), httpOptions);
  }

}
