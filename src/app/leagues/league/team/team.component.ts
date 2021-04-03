import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/global/search.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  team: any;
  params: any;
  players: any[] = [];
  loadingTeam: boolean;
  stats: boolean = true;
  loadingPlayers: boolean;
  currentPlayerPage: number;

  constructor(private searchService: SearchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadingTeam = true;
    this.params = this.route.snapshot.queryParams;
    this.searchService
      .fetchTeamStatistics(this.params['leagueId'], this.params['season'], this.params['teamId'])
      .subscribe(
        responseData => {
          this.team = responseData['response'];
          this.loadingTeam = false;
        }
      );
    this.loadPlayers(1);
  }

  getUrl() {
    return "url('" + this.team.team.logo + "')";
  }

  toggleView() {
    this.stats = !this.stats;
  }

  loadPlayers(index: number) {
    this.loadingPlayers = true;
    this.currentPlayerPage = index;
    const notInitialized = this.players[this.currentPlayerPage - 1] === undefined;
    if (notInitialized || this.players[this.currentPlayerPage - 1].length === 0) {
      this.searchService
        .fetchPlayers(this.params['leagueId'], this.params['season'], this.params['teamId'], index.toString())
        .subscribe(
          responseData => {
            console.log(responseData);
            if (notInitialized) {
              const total = +responseData['paging']['total'];
              for (let i = 0; i < total; i++) this.players.push([]);
            }
            this.players[this.currentPlayerPage - 1] = responseData['response'];
            this.loadingPlayers = false;
          }
        );
    } else this.loadingPlayers = false;
  }
}
