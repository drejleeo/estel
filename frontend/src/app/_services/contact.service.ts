import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Contact } from '../_models/contact';
import { count, retry } from 'rxjs/operators';

const baseUrl = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactUrl = `${baseUrl}/contact/`;

  constructor(private http: HttpClient) { }

  addContact(contact) {
    return this.http.post<Contact>(this.contactUrl, JSON.stringify(contact), httpOptions)
    .pipe(
      retry(1),
    );
  }
}
