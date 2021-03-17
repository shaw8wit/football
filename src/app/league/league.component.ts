import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SearchService } from '../global/search.service';
import { League } from './league.model';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {
  private country: string;
  leagues: League[] = [];

  constructor(private route: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit(): void {
    this.country = this.route.snapshot.queryParams['country'];
    this.searchService.fetchLeagues(this.country)
      .subscribe(responseData => {
        responseData['response'].forEach(e => {
          this.leagues.push(new League(e.league.id, e.league.name, e.league.type, e.league.logo, e.seasons));
        });
      });
  }
}
