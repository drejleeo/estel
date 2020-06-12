import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Parking } from '../_models/parking';
import { retry, catchError } from 'rxjs/operators';

const baseUrl = environment.apiUrl;
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  parkUrl = `${baseUrl}/parkings/`;

  constructor(private http: HttpClient) { }

  getParkings(queryParams?: {}): Observable<any> {
    const httpOptions = {
      headers,
      params: new HttpParams(queryParams)
    };

    return this.http.get<Observable<Parking[]>>(this.parkUrl, httpOptions)
    .pipe(
      retry(1),
    );
  }

  getOneParking(id: number): Observable<any> {
    return this.http.get<any>(`${this.parkUrl}${id}`)
    .pipe(
      retry(1),
    );
  }
}
