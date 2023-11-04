import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../Models/login';
import { Register } from '../Models/register';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { jwtAuth } from '../Models/jwtAuth';
import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  registerUrl = "/AuthManagement/Register";
  loginUrl = "/AuthManagement/Login";
  weatherUrl = "/WeatherForecast";
  constructor(private http: HttpClient) { }

  public register(user: Register): Observable<jwtAuth> {
    return this.http.post<jwtAuth>(`${environment.apiUrl}${this.registerUrl}`, user).pipe(catchError(this.errorHandler))
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error));
  }

  public login(user: Login): Observable<jwtAuth> {
    return this.http.post<jwtAuth>(`${environment.apiUrl}${this.loginUrl}`, user);
  }

  public getWeather(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${this.weatherUrl}`);
  }

  public isLoggedIn() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const payload = atob(token.split('.')[1]); // decode payload of token

      const parsedPayload = JSON.parse(payload); // convert payload into an Object

      return parsedPayload.exp > Date.now() / 1000; // check if token is expired
    } else {
      return false;
    }
  }

  public getUserName(): Observable<string> {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const payload = atob(token.split('.')[1]); // decode payload of token

      const parsedPayload = JSON.parse(payload); // convert payload into an Object

      return of("Welcome, " + parsedPayload.name + "!");
    } else {
      return of("");
    }
  }

}
