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
import { DatePipe } from '@angular/common';
import { rolePlayerAdd } from '../Models/rolePlayerAdd';

@Component({
  selector: 'app-game-detail-draft',
  templateUrl: './game-detail-draft.component.html',
  styleUrls: ['./game-detail-draft.component.css']
})
export class GameDetailDraftComponent {
  panelOpenState: boolean = false;
  dataSource : any;
  rolesDataSource: any;
  isLoading = false;
  rolesLoading = false;
  @Input() id? = '';
  @Input() sprid? = '';
  gameId : string = '';
  scenarioPhaseRoleId: string = '';
  subscription!: Subscription;
  everyThirtySeconds: Observable<number> = timer(0, 30000);
  columns: string[] = ['name', 'headShotURL', 'team', 'position', 'playerProjection.fantasyPoints', 'injuryInfo', 'passYards', 'passTD', 'interceptions'
  , 'rushYards', 'rushTD', 'recYards', 'recTD', 'nextGameTeam','timestamp'];
  rolecolumns: string[] = ['name', 'imageURL', 'description', 'bHero', 'position'];
  userName: string = '';
  dtPipe : DatePipe;
  
  rpAdd = new rolePlayerAdd();
 

  constructor(private router: Router,
    public route: ActivatedRoute,
    private authService: AuthenticationService,
    private gamesService: GamesService,
    private datePipe: DatePipe){

      this.dtPipe = datePipe;

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      
      this.gameId = params.get('id') ?? '';
      this.scenarioPhaseRoleId = params.get('sprid') ?? '';
      console.log("Game detail (draft): " + this.gameId)
      console.log("Game detail (draft) sprid: " + this.scenarioPhaseRoleId)


      //this.subscription = this.everyThirtySeconds.subscribe(() => {
      //  this.getGameData();
      //});

      this.authService.getUserName().subscribe(data => {  
 
        this.userName = data;
        this.userName = this.userName.substring(9, this.userName.length-1);
        console.log("App component username:" + this.userName);
      }); 

      this.dataSource = null;
      this.isLoading = true;

      this.gamesService.getScenarioPhaseRole(this.scenarioPhaseRoleId).subscribe({
        next: (roledata:any) => 
        {
          console.log(roledata);
          this.rolesDataSource = roledata;
        }, 
        error: err => {this.isLoading = false}
      });

      this.gamesService.getScenarioPhaseRolePlayers(this.gameId, this.scenarioPhaseRoleId).subscribe({
        next: (playersdata:any) => 
        {
          console.log(playersdata);
          this.isLoading = false;
          this.dataSource = playersdata;
        }, 
        error: err => {this.isLoading = false}
      });
    })
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }
  


  editGame(row: any) {
    //this.router.navigate(['/gamedetail'], {queryParams: {id: gameid}} );
    //this.router.navigate(['/gamedetail'], {queryParams: {id: row.gameId}} );
    console.log("List"+row.gameId)
    this.router.navigateByUrl('/gamedetail/' + row.gameId);
  }

  draftPlayer(player: any) {

    this.rpAdd.gameId = parseInt(this.gameId);
    this.rpAdd.nflPlayerId = player.nflPlayerId;
    this.rpAdd.scenarioPhaseRoleId = parseInt(this.scenarioPhaseRoleId);

    console.log(this.rpAdd);

    this.gamesService.addRolePlayer(this.rpAdd).subscribe({
      next: (gameDto) => 
      {
        this.router.navigateByUrl('/gamedetail/' + this.gameId);
      },
      error: err => 
      {
        console.log("This is an error assigning this player to the game:", err)
      }
    });
  
    
  }

  Cancel() {
    this.router.navigateByUrl('/gamedetail/' + this.gameId);
  }

}
