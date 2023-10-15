import { Component } from '@angular/core';
import { Login } from './Models/login';
import { Register } from './Models/register';
import { jwtAuth } from './Models/jwtAuth';
import { AuthenticationService } from './services/authentication.service';
import { MatLabel } from '@angular/material/form-field';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Source of Mecha';

  constructor(private authService: AuthenticationService){}
  
  GetWeather() {
    this.authService.getWeather().subscribe((weatherdata:any) => {
      console.log(weatherdata);
    });
  }
}
