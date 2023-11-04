import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable({

  providedIn: 'root'

})

export class HomeComponent {

  userName: string;

  constructor(private authService: AuthenticationService) {
    this.userName = "";  //this.authService.getUserName();

    this.authService.getUserName().subscribe((data) => {  

      // do something with the data here  
      this.userName = data;
    }); 

  }

}
