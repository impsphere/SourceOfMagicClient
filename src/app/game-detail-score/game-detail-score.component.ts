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
  selector: 'app-game-detail-score',
  templateUrl: './game-detail-score.component.html',
  styleUrls: ['./game-detail-score.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),],
})
export class GameDetailScoreComponent {
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

      //this.subscription = this.everyThirtySeconds.subscribe(() => {
        this.getGameData();
      //});

      this.authService.getUserName().subscribe(data => {  
 
        this.userName = data;
        this.userName = this.userName.substring(9, this.userName.length-1);
        console.log("App component username:" + this.userName);
      }); 

    })
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
        
        this.dataSource = gamesdata;

/*         this.gamesService.getAllGameScenarioPhaseRoless(this.gameId).subscribe({
          next: (rolesdata:any) => 
          {
            console.log(rolesdata);
            this.rolesDataSource = rolesdata;
            this.rolesLoading = false;
          }, 
          error: err => {this.rolesLoading = false
          }}) */

        this.gamesService.getGameScoring(this.gameId).subscribe({
          next: (scoredata:any) => 
          {
            console.log(scoredata);

            this.scoreDataSource = scoredata;
            this.rolesLoading = false;
            this.isLoading = false;
          }, 
          error: err => {this.rolesLoading = false
          }})

/* 
          this.scoreDataSource.forEach(p => {
            if (p.roles && Array.isArray(p.roles) && p.roles.length) {
              this.phaseData = [...this.phaseData, {...p, roles: new MatTableDataSource(p.roles)}];
            } else {
              this.phaseData = [...this.phaseData, p];
            }
          });

          this.scoreDataSource = new MatTableDataSource(this.phaseData);
 */
      }, 
      error: err => {this.isLoading = false
      }


      
    });
  }

  Cancel() {
    this.router.navigate(['gamelist']);
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