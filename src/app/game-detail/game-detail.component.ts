import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import { Router, ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';


@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent  {
  panelOpenState: boolean;

  @Input() id? = '';
  gameId : string = '';
  
  constructor(private router: Router,
    public route: ActivatedRoute){

      this.panelOpenState = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      
      this.gameId = params.get('id') ?? '';
      console.log("Game detail: " + this.gameId)



    })
  }

}
