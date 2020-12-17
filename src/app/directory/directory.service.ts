import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Contact } from './directory.model';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  private apiServer = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  addContact(contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiServer + '/contacts/', JSON.stringify(contact), this.httpOptions)
    .pipe(
      // map(response => {
      //   return response; 
      // }),
      catchError(this.errorHandler)
    );
  }

  allContact(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiServer + '/contacts/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  contactById(id): Observable<Contact> {
    return this.http.get<Contact>(this.apiServer + '/contacts/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  updateContact(id, contact): Observable<Contact> {
    return this.http.put<Contact>(this.apiServer + '/contacts/' + id, JSON.stringify(contact), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  deleteById(id){
    return this.http.delete<Contact>(this.apiServer + '/contacts/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
