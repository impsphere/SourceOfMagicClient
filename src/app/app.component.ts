import { Component } from '@angular/core';
import { Login } from './Models/login';
import { Register } from './Models/register';
import { jwtAuth } from './Models/jwtAuth';
import { AuthenticationService } from './services/authentication.service';
import { NflplayersService } from './services/nflplayers.service';
import { MatLabel } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Huddle of Heroes';
  userName: string;
  dtPipe : DatePipe;

  dataSource : any;
  columns: string[] = ['name', 'headShotURL', 'position', 'passYards', 'passTD'
  , 'rushYards', 'rushTD', 'timestamp'];

  @ViewChild(MatTable) mytable!: MatTable<any>;

  constructor(private authService: AuthenticationService,
    private nflPlayersService: NflplayersService,
    private datePipe: DatePipe){

    this.userName = "";  

    this.authService.getUserName().subscribe(data => {  
 
      this.userName = data;
      //console.log("App component username:" + this.userName);
    }); 

    this.authService.eventStream.subscribe(message =>
      {
        this.userName = message.toString();
        //console.log(message);
      }); 
    
      this.dtPipe = datePipe;
  }
  

  //userName: string = this.authService.getUserName();

  GetNFLPlayers(pos: string) {
    this.nflPlayersService.getNFLPlayers(pos).subscribe((playersdata:any) => {
      console.log(playersdata);
      this.dataSource = playersdata;
    });
  }

  editContact(player: any) {
    console.log(player);
  }

}
