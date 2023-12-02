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

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent {
  dtPipe : DatePipe;
  isLoading = false;
  dataSource : any;
  columns: string[] = ['description', 'scenario', 'heroName', 'villainName', 'heroScore', 'villainScore',
        'finalInd', 'rosterLockInd', 'season', 'week'];

  @ViewChild(MatTable) mytable!: MatTable<any>;

  constructor(private authService: AuthenticationService,
    private gamesService: GamesService,
    private datePipe: DatePipe){

      this.dtPipe = datePipe;

      this.isLoading = true;
      this.gamesService.getGames().subscribe({
        next: (gamesdata:any) => 
        {
        console.log(gamesdata);
        this.isLoading = false;
        this.dataSource = gamesdata;
        }, 
        error: err => {this.isLoading = false}
      });
  }

  editContact(player: any) {
    console.log(player);
  }

}
