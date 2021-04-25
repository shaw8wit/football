import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Country } from '../countries/country.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  countriesFetched = new Subject<Country[]>();
  private coverage: Object;
  private base_url = 'https://v3.football.api-sports.io/';
  private countries: Country[] = [];

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.countries.slice();
  }

  getCoverage() {
    return { ...this.coverage };
  }

  setCoverage(coverage: Object) {
    this.coverage = coverage;
  }

  notifyListeners() {
    this.countriesFetched.next(this.getCountries());
  }

  fetchCountries() {
    if (!this.countries.length) {
      console.log("Fetching countries:");
      this.http
        .get<Country[]>(this.base_url + 'countries')
        .subscribe(responseData => {
          responseData['response'].forEach(item => {
            this.countries.push(new Country(item['name'], item['flag']));
          });
          this.notifyListeners();
        });
    } else {
      this.notifyListeners();
    }
  }

  getHttpParams(params: string[][]) {
    let httpParams = new HttpParams();
    for (let param of params) httpParams = httpParams.append(param[0], param[1]);
    return httpParams;
  }

  fetchLeagues(country: string) {
    return this.http.get(
      this.base_url + 'leagues',
      {
        params: this.getHttpParams([['country', country]])
      }
    );
  }

  fetchTeamStandings(leagueId: string, season: string) {
    return this.http.get(
      this.base_url + 'standings',
      {
        params: this.getHttpParams([['league', leagueId], ['season', season]])
      }
    );
  }

  fetchTeamStatistics(leagueId: string, season: string, teamId: string) {
    return this.http.get(
      this.base_url + 'teams/statistics',
      {
        params: this.getHttpParams([['league', leagueId], ['season', season], ['team', teamId]])
      }
    );
  }

  fetchTopGoals(leagueId: string, season: string) {
    return this.http.get(
      this.base_url + 'players/topscorers',
      {
        params: this.getHttpParams([['league', leagueId], ['season', season]])
      }
    );
  }

  fetchTopAssists(leagueId: string, season: string) {
    return this.http.get(
      this.base_url + 'players/topassists',
      {
        params: this.getHttpParams([['league', leagueId], ['season', season]])
      }
    );
  }

  fetchPlayers(leagueId: string, season: string, teamId: string, page: string) {
    return this.http.get(
      this.base_url + 'players',
      {
        params: this.getHttpParams([['league', leagueId], ['season', season], ['team', teamId], ['page', page]])
      }
    );
  }

  fetchTrophies(playerId: string) {
    return this.http.get(
      this.base_url + 'trophies',
      {
        params: this.getHttpParams([['player', playerId]])
      }
    );
  }

  fetchTransfers(playerId: string) {
    return this.http.get(
      this.base_url + 'transfers',
      {
        params: this.getHttpParams([['player', playerId]])
      }
    );
  }

  fetchFixtures(leagueId: string, season: string) {
    return this.http.get(
      this.base_url + 'fixtures',
      {
        params: this.getHttpParams([['league', leagueId], ['season', season]])
      }
    );
  }

  fetchSidelined(playerId: string) {
    return this.http.get(
      this.base_url + 'sidelined',
      {
        params: this.getHttpParams([['player', playerId]])
      }
    );
  }
}
