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
  teamGroups: any[] = [];
  filterString: string = '';
  logoUrl: string = '';
  season: string = '';
  league: string = '';
  screenType: ScreenType;
  topGoals: any[] = [];
  topAssists: any[] = [];
  loaded: boolean;
  coverage: Object;
  // displayedPlayer: any;

  constructor(private route: ActivatedRoute, private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    this.loaded = false;
    this.coverage = this.searchService.getCoverage();
    const params = this.route.snapshot.queryParams;
    this.season = params['season'];
    if (this.coverage['top_assists']) {
      this.searchService.fetchTopAssists(params['leagueId'], this.season).subscribe(
        responseData => {
          this.topAssists = responseData['response'];
          this.setLoaded(ScreenType.TopAssists);
        }
      );
    }
    if (this.coverage['top_scorers']) {
      this.searchService.fetchTopGoals(params['leagueId'], this.season).subscribe(
        responseData => {
          this.topGoals = responseData['response'];
          this.setLoaded(ScreenType.TopGoals);
        }
      );
    }
    if (this.coverage['standings']) {
      this.searchService.fetchTeamStandings(params['leagueId'], this.season).subscribe(
        responseData => {
          console.log(responseData['response']);
          const r = responseData['response'][0]['league'];
          this.league = r['name'];
          this.logoUrl = r['logo'];
          this.teamGroups = r['standings'];
          this.setLoaded(ScreenType.Standings);
        }
      );
    }
  }

  setLoaded(screenType: ScreenType) {
    this.screenType = screenType;
    this.loaded = true;
  }

  public get ScreenType(): typeof ScreenType {
    return ScreenType;
  }

  onSubmit(id: string) {
    if (this.coverage['fixtures']['statistics_fixtures'] || this.coverage['fixtures']['statistics_players']) {
      this.router.navigate(['/team'], { queryParamsHandling: "merge", queryParams: { 'teamId': id } });
    }
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