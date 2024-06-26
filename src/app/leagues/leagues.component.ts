import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../global/search.service';
import { League } from './league.model';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit {
  leagues: League[] = [];
  filterString: string = '';
  flagUrl: string = '';
  country: string = '';
  loaded: boolean;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loaded = false;
    this.country = this.route.snapshot.queryParams['country'];
    this.searchService.fetchLeagues(this.country).subscribe(
      responseData => {
        this.flagUrl = responseData['response'][0].country.flag;
        responseData['response'].forEach(e => {
          this.leagues.push(new League(e.league.id, e.league.name, e.league.type, e.league.logo, e.seasons));
          this.loaded = true;
        });
      }
    );
  }

  onSubmit(leagueIdx: number, seasonIdx: number) {
    const league = this.leagues[leagueIdx];
    const season = league.seasons[seasonIdx];
    const coverage = season['coverage'];
    if (coverage['standings'] || coverage['top_scorers'] || coverage['top_assists']) {
      this.searchService.setCoverage(coverage);
      this.router.navigate(['/league'], { queryParams: { 'leagueId': league.id, 'season': season['year'] } });
    }
  }

  getFlagUrl() {
    return "url('" + this.flagUrl + "')";
  }
}
