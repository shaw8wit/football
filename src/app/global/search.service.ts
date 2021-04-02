import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { api_key } from '../const';
import { Country } from '../countries/country.model';
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  countriesFetched = new Subject<Country[]>();
  private base_url = 'https://v3.football.api-sports.io/';
  private countries: Country[] = [];

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.countries.slice();
  }

  notifyListeners() {
    this.countriesFetched.next(this.getCountries());
  }

  fetchCountries() {
    if (!this.countries.length) {
      console.log("Fetching countries:");
      this.http
        .get<Country[]>(this.base_url + 'countries', {
          headers: new HttpHeaders({ "x-rapidapi-key": api_key })
        })
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

  fetchLeagues(country: string) {
    return this.http.get(
      this.base_url + 'leagues',
      {
        headers: new HttpHeaders({ "x-rapidapi-key": api_key }),
        params: new HttpParams().set('country', country)
      }
    );
  }

  fetchTeamStandings(leagueId: string, season: string) {
    let params = new HttpParams();
    params = params.append('league', leagueId);
    params = params.append('season', season);
    return this.http.get(
      this.base_url + 'standings',
      {
        headers: new HttpHeaders({ "x-rapidapi-key": api_key }),
        params: params
      }
    );
  }

  fetchTeamStatistics(leagueId: string, season: string, teamId: string) {
    let params = new HttpParams();
    params = params.append('league', leagueId);
    params = params.append('season', season);
    params = params.append('team', teamId);
    return this.http.get(
      this.base_url + 'teams/statistics',
      {
        headers: new HttpHeaders({ "x-rapidapi-key": api_key }),
        params: params
      }
    );
  }

  fetchTopPlayers(leagueId: string, season: string) {
    let params = new HttpParams();
    params = params.append('league', leagueId);
    params = params.append('season', season);
    return this.http.get(
      this.base_url + 'players/topscorers',
      {
        headers: new HttpHeaders({ "x-rapidapi-key": api_key }),
        params: params
      }
    );
  }

  fetchPlayers(leagueId: string, season: string, teamId: string, page: string) {
    let params = new HttpParams();
    params = params.append('league', leagueId);
    params = params.append('season', season);
    params = params.append('team', teamId);
    params = params.append('page', page);
    return this.http.get(
      this.base_url + 'players',
      {
        headers: new HttpHeaders({ "x-rapidapi-key": api_key }),
        params: params
      }
    );
  }
}
