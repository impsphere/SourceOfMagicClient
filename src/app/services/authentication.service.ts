import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../Models/login';
import { Register } from '../Models/register';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { jwtAuth } from '../Models/jwtAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  registerUrl = "/AuthManagement/Register";
  loginUrl = "/AuthManagement/Login";
  weatherUrl = "/WeatherForecast";
  constructor(private http: HttpClient) { }

  public register(user: Register): Observable<jwtAuth> {
    return this.http.post<jwtAuth>(`${environment.apiUrl}${this.registerUrl}`, user);
  }

  public login(user: Login): Observable<jwtAuth> {
    return this.http.post<jwtAuth>(`${environment.apiUrl}${this.loginUrl}`, user);
  }

  public getWeather(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${this.weatherUrl}`);
  }

}
