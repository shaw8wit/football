import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '../search.service';
import { Country } from './country.model';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  countries: Country[];

  constructor(private search: SearchService) { }

  ngOnInit(): void {
    this.subscription = this.search.countriesFetched.subscribe(
      (countries: Country[]) => this.countries = countries
    );
    this.search.fetchCountries();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
