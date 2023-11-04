import { Component } from '@angular/core';
import { Login } from './Models/login';
import { Register } from './Models/register';
import { jwtAuth } from './Models/jwtAuth';
import { AuthenticationService } from './services/authentication.service';
import { MatLabel } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Huddle of Heroes';
  userName: string;

  constructor(private authService: AuthenticationService){

    this.userName = "";  

    this.authService.getUserName().subscribe((data) => {  
 
      this.userName = data;
      console.log("App component username:" + this.userName);
    }); 
  }
  
  //userName: string = this.authService.getUserName();

  GetWeather() {
    this.authService.getWeather().subscribe((weatherdata:any) => {
      console.log(weatherdata);
    });
  }
}
