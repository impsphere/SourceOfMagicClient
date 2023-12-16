import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent  {
  panelOpenState: boolean;
  //id: string;
  constructor(private router: Router,
    public route: ActivatedRoute){
      //let idFromStorage = this.route.snapshot.paramMap.get('id');
      //if (!idFromStorage ) { 
      //  throw new Error("No game id supplied!"); 
      //}
      //this.id = idFromStorage;
      //console.log("Game detail: " + this.id);
      this.panelOpenState = false;
  }
}
