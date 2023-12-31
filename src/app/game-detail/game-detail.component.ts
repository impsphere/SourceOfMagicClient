import { Component, OnInit, OnDestroy, ViewChild, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { GamesService } from '../services/games.service';
import { timer, Observable, Subscription } from 'rxjs';
import { MatTableDataSource, MatTable } from '@angular/material/table';

 // Nested results tables
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),],
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
  everyThirtySeconds: Observable<number> = timer(0, 45000);  //WHADIAG
  columns: string[] = ['name', 'imageURL', 'description', 'bHero', 'position', 'nflName', 'nflImageURL', 'team'];
  userName: string = '';

  // Nested results tables
  scoreDataSource: any;
  scoreColumns: string[] = ['imageURL', 'description', 'heroScore', 'villainScore'];
  expandedElement: any | null;
  innerDisplayedColumns = ['imageURL', 'name', 'bHero', 'headShotURL', 'nflName', 'position', 'team', 'phaseRoleMessage'];
  phaseData: Phase[] = [];

  constructor(private router: Router,
    public route: ActivatedRoute,
    private authService: AuthenticationService,
    private gamesService: GamesService,
    private cd: ChangeDetectorRef){
      this.isLoading = true;
      this.rolesLoading = true;
      this.panelOpenState = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      
      this.gameId = params.get('id') ?? '';
      console.log("Game detail: " + this.gameId)
      //this.getGameData();

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

  toggleRow(element: any) {
    element.roles && element.roles.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
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
/* 
        this.gamesService.getGameScoring(this.gameId).subscribe({
          next: (scoredata:any) => 
          {
            console.log(scoredata);

            this.scoreDataSource = scoredata;
            this.rolesLoading = false;
          }, 
          error: err => {this.rolesLoading = false
          }}) */

      }, 
      error: err => {this.isLoading = false
      }


      
    });
  }

  editGame(row: any) {

    if (!this.dataSource.rosterLockInd && !this.dataSource.invalidInd && !this.dataSource.finalInd)
    {

      if (row.nflPlayerId == 0)
      {

        if ((this.dataSource.heroNextPickInd && this.dataSource.heroName == this.userName) || 
        (!this.dataSource.heroNextPickInd && this.dataSource.villainName == this.userName))
        {
          if (((row.bHero) && this.dataSource.heroNextPickInd) || ((!row.bHero) && !this.dataSource.heroNextPickInd))
          {
            console.log("List"+row.gameId)
            this.router.navigateByUrl('/gamedetaildraft/' + this.gameId + '/' + row.scenarioPhaseRoleId);
          }
          else {
            console.log("Role selected does not align with player's faction.");
          }
        }
        else{
          console.log("Player does not have the next pick.");
        }
      } else {
        console.log("This role has already been assigned a player.");
      }

    } else {
      console.log("Game is roster locked, invalid or final.");
    }
  }

  Cancel() {
    this.router.navigate(['gamelist']);
  }

  Scoring() {
    this.router.navigateByUrl('/gamedetailscore/' + this.gameId);
  }
}


export interface Phase {
  imageURL: string;
  description: string;
  heroScore: string;
  villainScore: string;
  roles?: Role[] | MatTableDataSource<Role>;
}

export interface Role {
  imageURL: string;
  name: string;
  bHero: boolean;
  headShotURL: string;
  nflName: string;
  position: string;
  team: string;
  phaseRoleMessage: string;
}