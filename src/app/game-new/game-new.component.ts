import { Component } from '@angular/core';
import { Login } from '../Models/login';
import { Register } from '../Models/register';
import { jwtAuth } from '../Models/jwtAuth';
import { AuthenticationService } from '../services/authentication.service';
import { GamesService } from '../services/games.service';
import { MatLabel } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { gameAdd } from '../Models/gameAdd';

@Component({
  selector: 'app-game-new',
  templateUrl: './game-new.component.html',
  styleUrls: ['./game-new.component.css']
})
export class GameNewComponent {

  gameDto = new gameAdd();
  playerSource: any;
  selectedHeroPlayerId: any;
  selectedVillainPlayerId: any;
  sccenarioSource: any;

  constructor(private authService: AuthenticationService,
    private gamesService: GamesService,
    private router: Router){

      this.gamesService.getPlayers().subscribe({
        next: (playerdata:any) => 
        {
          console.log(playerdata);
          this.playerSource = playerdata;
        }, 
        error: err => {}
      });

  }

  SetHeroPlayer(event: any)
  {
    console.log(event);
    this.selectedHeroPlayerId = event.source.value;
  }
  
  SetVillainPlayer(event: any)
  {
    console.log(event);
    this.selectedVillainPlayerId = event.source.value;
  }

  AddGame(gameDto: gameAdd) {
    this.gamesService.addGame(gameDto).subscribe({
      next: (gameDto) => 
      {
        this.router.navigate(['gamelist'])
      },
      error: err => 
      {
        console.log("This is an error creating game:", err)
      }
    });

  }

}
