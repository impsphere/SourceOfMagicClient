import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';


@Component({
  selector: 'app-game-mockup',
  templateUrl: './game-mockup.component.html',
  styleUrls: ['./game-mockup.component.css']
})
export class GameMockupComponent {
  panelOpenState: boolean;

  constructor(){

      this.panelOpenState = false;
  }
}
