import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../Models/login';
import { Register } from '../Models/register';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { jwtAuth } from '../Models/jwtAuth';
import { gameAdd } from '../Models/gameAdd';
import { rolePlayerAdd } from '../Models/rolePlayerAdd';
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

  public getGame(GameId:string): Observable<jwtAuth> {
    return this.http.get<any>(`${environment.apiUrl}${this.gamesUrl+"GetGame?GameId="+GameId}`);
  }

  public getScenarioPhaseRoles(ScenarioId:string): Observable<jwtAuth> {
    return this.http.get<any>(`${environment.apiUrl}${this.gamesUrl+"GetAllScenarioPhaseRoles?scenarioId="+ScenarioId}`);
  }

  public getAllGameScenarioPhaseRoless(GameId:string): Observable<jwtAuth> {
    return this.http.get<any>(`${environment.apiUrl}${this.gamesUrl+"GetAllGameScenarioPhaseRoles?gameId="+GameId}`);
  }

  public getScenarioPhaseRolePlayers(GameId:string, SprId:string): Observable<jwtAuth> {
    return this.http.get<any>(`${environment.apiUrl}${this.gamesUrl+"GetScenarioPhaseRolePlayers?gameId="+GameId+"&sprId="+SprId}`);
  }

  public getScenarioPhaseRole(SprId:string): Observable<jwtAuth> {
    return this.http.get<any>(`${environment.apiUrl}${this.gamesUrl+"GetScenarioPhaseRole?sprId="+SprId}`);
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

  public addRolePlayer(plyr: rolePlayerAdd): Observable<jwtAuth> {
    return this.http.post<jwtAuth>(`${environment.apiUrl}${this.gamesUrl+"AddGameScenarioNFLPlayer"}`, plyr).pipe(catchError(this.errorHandler))
  }

  public getGameScoring(GameId:string): Observable<jwtAuth> {
    return this.http.get<any>(`${environment.apiUrl}${this.gamesUrl+"GetGameScoring?gameId="+GameId}`);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error));
  }

}
