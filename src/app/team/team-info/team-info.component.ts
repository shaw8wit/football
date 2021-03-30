import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/global/search.service';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {
  team: any;
  players: any[] = [];
  stats: boolean = true;
  totalPlayerPage: any = 1;
  currentPlayerPage: number = 1;
  params: any;

  constructor(private searchService: SearchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.params = this.route.snapshot.queryParams;
    this.searchService
      .fetchTeamStatistics(this.params['leagueId'], this.params['season'], this.params['teamId'])
      .subscribe(
        responseData => {
          this.team = responseData['response'];
        }
      );
    this.loadPlayers(0);
  }

  getUrl() {
    return "url('" + this.team.team.logo + "')";
  }

  toggleView() {
    this.stats = !this.stats;
  }

  loadPlayers(index: number) {
    this.currentPlayerPage = index++;
    console.log(this.players[this.currentPlayerPage]);
    if (this.players[this.currentPlayerPage] === undefined) {
      this.searchService
        .fetchPlayers(this.params['leagueId'], this.params['season'], this.params['teamId'], index.toString())
        .subscribe(
          responseData => {
            if (index === 0) {
              this.currentPlayerPage = responseData['paging']['current'];
              this.totalPlayerPage = new Array(+responseData['paging']['total']);
              this.players = new Array(+responseData['paging']['total']);
            }
            this.players[this.currentPlayerPage - 1] = responseData['response'];
          }
        );
    }
  }
}
