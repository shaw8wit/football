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
  players: any[] = []; // ! use this data for displaying teams players
  stats: boolean = true;
  currentPlayerPage: number = 0;
  totalPlayerPage: any = 0;

  constructor(private searchService: SearchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    this.searchService
      .fetchTeamStatistics(params['leagueId'], params['season'], params['teamId'])
      .subscribe(
        responseData => {
          this.team = responseData['response'];
        }
      );
    this.searchService
      .fetchPlayers(params['leagueId'], params['season'], params['teamId'])
      .subscribe(
        responseData => {
          console.log(responseData);
          this.currentPlayerPage = responseData['paging']['current'];
          this.totalPlayerPage = new Array(+responseData['paging']['total']);
          this.players = responseData['response'];
          console.log("Players:\n");
          console.log(this.players);
        }
      );
  }

  getUrl() {
    return "url('" + this.team.team.logo + "')";
  }

  toggleView() {
    this.stats = !this.stats;
  }
}
