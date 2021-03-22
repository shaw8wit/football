import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { CountryComponent } from './country/country.component';
import { FilterPipe } from './global/filter.pipe';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { LeagueComponent } from './league/league.component';
import { TeamComponent } from './team/team.component';
import { TeamInfoComponent } from './team/team-info/team-info.component';

@NgModule({
  declarations: [
    AppComponent,
    FavoriteComponent,
    CountryComponent,
    FilterPipe,
    SearchComponent,
    LeagueComponent,
    TeamComponent,
    TeamInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
