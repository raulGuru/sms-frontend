import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';

import { AuthData } from './auth-data.model';
import { environment } from '../../environments/environment';

//const BACKEND_URL = environment.apiUrl + "/user/";
const BACKEND_URL = environment.apiUrl + '/auth';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string;
  private tokenTimer: any;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private userId: string;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    this.autoAuthUser();
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, name: string, password: string): Observable<any> {
    const authData: AuthData = { email: email, name: name, password: password };
    return this.http
      .post<AuthData>(
        `${BACKEND_URL}/register`,
        JSON.stringify(authData),
        httpOptions
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.errorHandler)
      );
  }

  login(email: string, password: string): Observable<any> {
    const authData: AuthData = { email: email, password: password };
    return this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        `${BACKEND_URL}/login`,
        authData
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.errorHandler)
      );
  }

  resetPassword(email: string, password: string): Observable<any> {
    this.autoAuthUser();
    const data: any = { email: email, password: password, userId: this.userId, token: this.token };
    return this.http.post<any>(`${BACKEND_URL}/resetpassword`, data).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.errorHandler)
    );
  }

  setAuthFail(): void {
    this.clearAuthData();
    this.authStatusListener.next(false);
  }

  setAuthToken(tokenObj: any) {
    this.token = tokenObj?.token;
    if (this.token) {
      const expiresInDuration = tokenObj.expiresIn;
      this.setAuthTimer(expiresInDuration);
      this.isAuthenticated = true;
      this.userId = tokenObj.userId;
      this.authStatusListener.next(true);
      const now = new Date();
      tokenObj.expirationDate = new Date(
        now.getTime() + expiresInDuration * 1000
      );
      this.saveAuthData(tokenObj);
      this.router.navigate(['/dashboard']);
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private clearAuthData() {
    localStorage.removeItem('currentuser');
    localStorage.clear();
  }

  private saveAuthData(token: object) {
    localStorage.setItem('currentuser', JSON.stringify(token));
  }

  autoAuthUser(): void {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      //here we can logout user or extend expiresIn or refresh new token from service.
      //currently logout
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private getAuthData() {
    const tokenObj = JSON.parse(localStorage.getItem('currentuser'));
    if (!tokenObj) {
      return;
    }
    const { token, expirationDate, userId } = tokenObj;
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    };
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
