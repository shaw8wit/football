import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../global/search.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teams: any[] = [];
  filterString: string = '';
  logoUrl: string = '';
  season: string = '';
  league: string = '';
  topScorers: any[] = []; // ! use this data for displaying topscorers

  constructor(private route: ActivatedRoute, private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    this.season = params['season'];
    this.searchService.fetchTeamStandings(params['leagueId'], this.season).subscribe(
      responseData => {
        const r = responseData['response'][0]['league'];
        this.league = r['name'];
        this.logoUrl = r['logo'];
        this.teams = r['standings'][0];
      }
    );
    this.searchService.fetchTopPlayers(params['leagueId'], this.season).subscribe(
      responseData => {
        this.topScorers = responseData['response'];
        console.log("Top scorers:\n");
        console.log(this.topScorers);
      }
    );
  }

  onSubmit(id: string) {
    this.router.navigate(['/team-info'], { queryParamsHandling: "merge", queryParams: { 'teamId': id } });
  }

  getLogoUrl() {
    return "url('" + this.logoUrl + "')";
  }
}