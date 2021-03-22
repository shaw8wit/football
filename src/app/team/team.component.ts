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
  teams: Team[] = [];
  leagueId: string;
  season: string;
  filterString: string = '';

  constructor(private route: ActivatedRoute, private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    this.leagueId = this.route.snapshot.queryParams['leagueId'];
    this.season = this.route.snapshot.queryParams['season'];
    this.searchService.fetchTeams(this.leagueId, this.season)
      .subscribe(responseData => {
        responseData['response'].forEach(e => {
          this.teams.push(new Team(e.team.id, e.team.name, e.team.logo));
        });
      });
  }

  onSubmit(id: string) {
    this.searchService.fetchTeamStatistics(this.leagueId, this.season, id);
    this.router.navigate(['/team-info']);
  }
}
