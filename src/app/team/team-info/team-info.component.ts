import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/global/search.service';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {
  team: any;
  url: string = '';

  constructor(private searchService: SearchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    this.searchService
      .fetchTeamStatistics(params['leagueId'], params['season'], params['teamId'])
      .subscribe(
        responseData => {
          this.team = responseData['response'];
          this.url = this.team.team.logo;
        }
      );
  }

  getUrl() {
    return "url('" + this.url + "')";
  }
}
