import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { api_key } from './const';
import { Country } from './country/country.model';

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
      this.http
        .get<[Country]>(this.base_url + 'countries', {
          headers: new HttpHeaders({ "x-rapidapi-key": api_key })
        })
        .subscribe(responseData => {
          const response = responseData['response'];
          for (let item in response) {
            this.countries.push(new Country(response[item]['name'], response[item]['flag']));
          }
          this.notifyListeners();
        });
    }
  }
}
