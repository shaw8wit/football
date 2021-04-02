import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '../global/search.service';
import { Country } from './country.model';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  filterString: string = '';
  countries: Country[] = [];
  loaded: boolean;

  constructor(private search: SearchService) { }

  ngOnInit(): void {
    this.loaded = false;
    this.subscription = this.search.countriesFetched.subscribe(
      (countries: Country[]) => {
        this.countries = countries;
        this.loaded = true;
      }
    );
    this.search.fetchCountries();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
