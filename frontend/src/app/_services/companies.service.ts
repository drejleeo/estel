import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Company } from '../_models/company';
import { Observable, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

const baseUrl = environment.apiUrl;
const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  companiesUrl = `${baseUrl}/companies/`;

  constructor(private http: HttpClient) { }

  getCompanies(queryParams?: {}) {
    const httpOptions = {
      headers,
      params: new HttpParams(queryParams),
    };

    return this.http.get<Company>(`${this.companiesUrl}`, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError<Company>('getCompanies', ))
    );
  }

  getCompany(id: number) {
    return this.http.get<Company>(`${this.companiesUrl}${id}`)
    .pipe(
      retry(1),
      catchError(this.handleError<Company>('getCompany', ))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // console.log(error); // log to console instead

      // console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
