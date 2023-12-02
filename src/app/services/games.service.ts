import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../Models/login';
import { Register } from '../Models/register';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { jwtAuth } from '../Models/jwtAuth';
import { gameAdd } from '../Models/gameAdd';
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

  public getPlayers(): Observable<jwtAuth> {
    return this.http.get<any>(`${environment.apiUrl}${this.gamesUrl+"GetAllPlyrs"}`);
  }

  public getScenarios(): Observable<jwtAuth> {
    return this.http.get<any>(`${environment.apiUrl}${this.gamesUrl+"GetAllScenarios"}`);
  }

  public addGame(game: gameAdd): Observable<jwtAuth> {
    return this.http.post<jwtAuth>(`${environment.apiUrl}${this.gamesUrl+"AddGame"}`, game).pipe(catchError(this.errorHandler))
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error));
  }

}
