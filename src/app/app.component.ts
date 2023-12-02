import { Component } from '@angular/core';
import { Login } from './Models/login';
import { Register } from './Models/register';
import { jwtAuth } from './Models/jwtAuth';
import { AuthenticationService } from './services/authentication.service';
import { NflplayersService } from './services/nflplayers.service';
import { GamesService } from './services/games.service';
import { MatLabel } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Huddle of Heroes';
  userName: string;


  constructor(private authService: AuthenticationService,
    private nflPlayersService: NflplayersService,
    private gamesService: GamesService,
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
  
  }
  

  //userName: string = this.authService.getUserName();


}
