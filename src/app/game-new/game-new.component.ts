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
import { Validators, ValidationErrors, ValidatorFn } from "@angular/forms";
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";

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
  scenarioSource: any;
  selectedScenarioId: any;

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

      this.gamesService.getScenarios().subscribe({
        next: (scenariodata:any) => 
        {
          console.log(scenariodata);
          this.scenarioSource = scenariodata;
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

  SetScenario(event: any)
  {
    console.log(event);
    this.selectedScenarioId = event.source.value;
  }

  AddGame(gameDto: gameAdd) {

    if (!this.newGameForm.invalid)
    {
      gameDto.HeroPlayerId = this.selectedHeroPlayerId;
      gameDto.VillainPlayerId = this.selectedVillainPlayerId;
      gameDto.ScenarioId = this.selectedScenarioId;
      console.log(gameDto);

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

  Cancel() {
    this.router.navigate(['gamelist']);
  }

  newGameForm = new FormGroup({
    Description: new FormControl("", [
      Validators.required
    ]),
    HeroPlayer: new FormControl("", [
      Validators.required
    ]),
    VillainPlayer: new FormControl("", [
      Validators.required
    ]),
    Scenario: new FormControl("", [
      Validators.required
    ])
  });

}
