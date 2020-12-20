import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Contact, Tag } from './directory.model';

@Injectable({
  providedIn: 'root',
})
export class DirectoryService {
  private apiServer = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  /** Contact */

  addContact(contact): Observable<Contact> {
    return this.http
      .post<Contact>(
        `${this.apiServer}/contacts/`,
        JSON.stringify(contact),
        this.httpOptions
      )
      .pipe(
        // map(response => {
        //   return response;
        // }),
        catchError(this.errorHandler)
      );
  }

  allContact(params): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiServer}/contacts?_start=${params.page}&_limit=${params.limit}`,
        { observe: 'response' }
      )
      .pipe(
        map((res) => {
          return {
            total: res.headers.get('X-Total-Count'),
            data: res.body,
          };
        }),
        catchError(this.errorHandler)
      );
  }

  contactById(id): Observable<Contact> {
    return this.http
      .get<Contact>(`${this.apiServer}/contacts/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  updateContact(id, contact): Observable<Contact> {
    return this.http
      .put<Contact>(
        `${this.apiServer}/contacts/${id}`,
        JSON.stringify(contact),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  deleteById(id) {
    return this.http
      .delete<Contact>(`${this.apiServer}/contacts/${id}`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  /** Tag */
  addTag(tag: Tag): Observable<Tag> {
    return this.http
      .post<Tag>(
        `${this.apiServer}/tags/`,
        JSON.stringify(tag),
        this.httpOptions
      )
      .pipe(
        // map(response => {
        //   return response;
        // }),
        catchError(this.errorHandler)
      );
  }

  allTags(params): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiServer}/tags?_start=${params.page}&_limit=${params.limit}`,
        { observe: 'response' }
      )
      .pipe(
        map((res) => {
          return {
            total: res.headers.get('X-Total-Count'),
            data: res.body,
          };
        }),
        catchError(this.errorHandler)
      );
  }

  tagById(id: number): Observable<Tag> {
    return this.http
      .get<Tag>(`${this.apiServer}/tags/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  updateTag(id, tag): Observable<Tag> {
    return this.http
      .put<Tag>(
        `${this.apiServer}/tags/${id}`,
        JSON.stringify(tag),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  deleteTagById(id) {
    return this.http
      .delete<Tag>(`${this.apiServer}/tags/${id}`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
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
