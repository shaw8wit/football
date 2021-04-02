import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../global/search.service';

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
  standings: boolean = true;
  topPlayers: any[] = [];
  loaded: boolean;

  constructor(private route: ActivatedRoute, private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    this.loaded = false;
    const params = this.route.snapshot.queryParams;
    this.season = params['season'];
    this.searchService.fetchTopPlayers(params['leagueId'], this.season).subscribe(
      responseData => {
        this.topPlayers = responseData['response'];
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

  onSubmit(id: string) {
    this.router.navigate(['/team'], { queryParamsHandling: "merge", queryParams: { 'teamId': id } });
  }

  getLogoUrl() {
    return "url('" + this.logoUrl + "')";
  }

  toggleView() {
    this.standings = !this.standings;
  }
}