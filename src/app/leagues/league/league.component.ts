import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../global/search.service';

enum ScreenType {
  Standings,
  TopGoals,
  TopAssists,
};
@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {
  teams: any[] = [];
  filterString: string = '';
  logoUrl: string = '';
  season: string = '';
  league: string = '';
  screenType: ScreenType = ScreenType.Standings;
  topGoals: any[] = [];
  topAssists: any[] = [];
  loaded: boolean;
  // displayedPlayer: any;

  constructor(private route: ActivatedRoute, private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    this.loaded = false;
    const params = this.route.snapshot.queryParams;
    this.season = params['season'];
    this.searchService.fetchTopGoals(params['leagueId'], this.season).subscribe(
      responseData => {
        this.topGoals = responseData['response'];
      }
    );
    this.searchService.fetchTopAssists(params['leagueId'], this.season).subscribe(
      responseData => {
        this.topAssists = responseData['response'];
      }
    );
    this.searchService.fetchTeamStandings(params['leagueId'], this.season).subscribe(
      responseData => {
        const r = responseData['response'][0]['league'];
        this.league = r['name'];
        this.logoUrl = r['logo'];
        this.teams = r['standings'][0];
        this.loaded = true;
      }
    );
  }

  public get ScreenType(): typeof ScreenType {
    return ScreenType;
  }

  onSubmit(id: string) {
    this.router.navigate(['/team'], { queryParamsHandling: "merge", queryParams: { 'teamId': id } });
  }

  getLogoUrl() {
    return "url('" + this.logoUrl + "')";
  }

  toggleView(newScreenType: ScreenType) {
    this.screenType = newScreenType;
  }

  // togglePlayerDisplay(p: any = null) {
  //   this.displayedPlayer = p;
  // }
}