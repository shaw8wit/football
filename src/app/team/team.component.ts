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
  filterString: string = '';

  constructor(private route: ActivatedRoute, private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    this.searchService.fetchTeams(params['leagueId'], params['season'])
      .subscribe(responseData => {
        responseData['response'].forEach(e => {
          this.teams.push(new Team(e.team.id, e.team.name, e.team.logo));
        });
      }
      );
  }

  onSubmit(id: string) {
    this.router.navigate(['/team-info'], { queryParamsHandling: "merge", queryParams: { 'teamId': id } });
  }
}
