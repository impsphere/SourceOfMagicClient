import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../Models/login';
import { Register } from '../Models/register';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { jwtAuth } from '../Models/jwtAuth';
import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  gamesUrl = "/Games/";
  constructor(private http: HttpClient) { }

  public getGames(): Observable<jwtAuth> {
    return this.http.get<any>(`${environment.apiUrl}${this.gamesUrl+"Get"}`);
  }
}
