import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegComponent } from './User/login-reg/login-reg.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { NFLPlayersComponent } from './nflplayers/nflplayers.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GameDetailDraftComponent } from './game-detail-draft/game-detail-draft.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameNewComponent } from './game-new/game-new.component';
import { GameDetailScoreComponent } from './game-detail-score/game-detail-score.component';



const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {path: 'nflplayers', component: NFLPlayersComponent, canActivate: [AuthGuard] },
  {path: 'gamedetail/:id', component: GameDetailComponent, canActivate: [AuthGuard] },
  {path: 'gamedetaildraft/:id/:sprid', component: GameDetailDraftComponent, canActivate: [AuthGuard] },
  {path: 'gamedetailscore/:id', component: GameDetailScoreComponent, canActivate: [AuthGuard] },
  {path: 'gamelist', component: GameListComponent, canActivate: [AuthGuard] },
  {path: 'gamenew', component: GameNewComponent, canActivate: [AuthGuard] },
  {path: 'loginreg', component: LoginRegComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
