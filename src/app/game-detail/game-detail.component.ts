import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import { Router, ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { GamesService } from '../services/games.service';


@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent  {
  panelOpenState: boolean;
  dataSource : any;
  isLoading = false;
  @Input() id? = '';
  gameId : string = '';

  constructor(private router: Router,
    public route: ActivatedRoute,
    private authService: AuthenticationService,
    private gamesService: GamesService){
      this.isLoading = true;
      this.panelOpenState = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      
      this.gameId = params.get('id') ?? '';
      console.log("Game detail: " + this.gameId)

      this.gamesService.getGame(this.gameId).subscribe({
        next: (gamesdata:any) => 
        {
        console.log(gamesdata);
        this.isLoading = false;
        this.dataSource = gamesdata;
        }, 
        error: err => {//this.isLoading = false
        }
      });


    })
  }

}
