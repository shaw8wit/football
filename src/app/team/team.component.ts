import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../global/search.service';
import { Team } from './team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teams: Team[] = [];

  constructor(private route: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit(): void {
    const leagueId = this.route.snapshot.queryParams['leagueId'];
    const season = this.route.snapshot.queryParams['season'];
    this.searchService.fetchTeams(leagueId, season)
      .subscribe(responseData => {
        responseData['response'].forEach(e => {
          this.teams.push(new Team(e.team.id, e.team.name, e.team.logo));
        });
      });
  }

}
