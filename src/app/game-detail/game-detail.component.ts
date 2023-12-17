import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { GamesService } from '../services/games.service';
import { timer, Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit, OnDestroy {
  panelOpenState: boolean;
  dataSource : any;
  rolesDataSource: any;
  isLoading = false;
  rolesLoading = false;
  @Input() id? = '';
  gameId : string = '';
  subscription!: Subscription;
  everyThirtySeconds: Observable<number> = timer(0, 30000);
  columns: string[] = ['name', 'imageURL', 'description', 'bHero', 'position', 'nflName', 'nflImageURL', 'team'];
  userName: string = '';

  constructor(private router: Router,
    public route: ActivatedRoute,
    private authService: AuthenticationService,
    private gamesService: GamesService){
      this.isLoading = true;
      this.rolesLoading = true;
      this.panelOpenState = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      
      this.gameId = params.get('id') ?? '';
      console.log("Game detail: " + this.gameId)
      this.getGameData();

      this.subscription = this.everyThirtySeconds.subscribe(() => {
        this.getGameData();
      });

      this.authService.getUserName().subscribe(data => {  
 
        this.userName = data;
        this.userName = this.userName.substring(9, this.userName.length-1);
        console.log("App component username:" + this.userName);
      }); 

    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getGameData() {
    this.gamesService.getGame(this.gameId).subscribe({
      next: (gamesdata:any) => 
      {
      console.log(gamesdata);
      this.isLoading = false;
      this.dataSource = gamesdata;

      this.gamesService.getAllGameScenarioPhaseRoless(this.gameId).subscribe({
        next: (rolesdata:any) => 
        {
          console.log(rolesdata);
          this.rolesDataSource = rolesdata;
          this.rolesLoading = false;
        }, 
        error: err => {this.rolesLoading = false
        }})
      }, 
      error: err => {this.isLoading = false
      }
    });
  }

  editGame(row: any) {
    //this.router.navigate(['/gamedetail'], {queryParams: {id: gameid}} );
    //this.router.navigate(['/gamedetail'], {queryParams: {id: row.gameId}} );
    console.log("List"+row.gameId)
    this.router.navigateByUrl('/gamedetail/' + row.gameId);
  }

}


