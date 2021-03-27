import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../global/search.service';
import { Team } from './team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teams: any[] = [];
  filterString: string = '';
  logoUrl: string = '';
  league: string = '';

  constructor(private route: ActivatedRoute, private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    this.searchService.fetchTeamStandings(params['leagueId'], params['season']).subscribe(
      responseData => {
        console.log(responseData['response']);
        this.teams = responseData['response'][0]['league']['standings'][0];
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
