import { Component } from '@angular/core';
import { Login } from '../Models/login';
import { Register } from '../Models/register';
import { jwtAuth } from '../Models/jwtAuth';
import { AuthenticationService } from '../services/authentication.service';
import { NflplayersService } from '../services/nflplayers.service';
import { MatLabel } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-nflplayers',
  templateUrl: './nflplayers.component.html',
  styleUrls: ['./nflplayers.component.css']
})
export class NFLPlayersComponent {

  dtPipe : DatePipe;
  isLoading = false;
  dataSource : any;
  columns: string[] = ['name', 'headShotURL', 'team', 'position', 'playerProjection.fantasyPoints', 'injuryInfo', 'passYards', 'passTD', 'interceptions'
  , 'rushYards', 'rushTD', 'recYards', 'recTD', 'nextGameTeam','timestamp'];

  @ViewChild(MatTable) mytable!: MatTable<any>;

  constructor(private authService: AuthenticationService,
    private nflPlayersService: NflplayersService,
    private datePipe: DatePipe){

      this.dtPipe = datePipe;
  }
  

  //userName: string = this.authService.getUserName();

  GetNFLPlayers(pos: string) {
    this.dataSource = null;
    this.isLoading = true;
    this.nflPlayersService.getNFLPlayers(pos).subscribe({
      next: (playersdata:any) => 
      {
       console.log(playersdata);
      this.isLoading = false;
      this.dataSource = playersdata;
      }, 
      error: err => {this.isLoading = false}
    });
  }

  editContact(player: any) {
    console.log(player);
  }

}
