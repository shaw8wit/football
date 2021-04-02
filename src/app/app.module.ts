import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SplitPipe } from './global/split.pipe';
import { FilterPipe } from './global/filter.pipe';

import { AppComponent } from './app.component';
import { LeagueComponent } from './leagues/league/league.component';
import { PlayerComponent } from './player/player.component';
import { SearchComponent } from './search/search.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { CountriesComponent } from './countries/countries.component';
import { FavoriteComponent } from './global/favorite/favorite.component';
import { LoaderComponent } from './global/loader/loader.component';
import { TeamComponent } from './leagues/league/team/team.component';

@NgModule({
  declarations: [
    AppComponent,
    LeagueComponent,
    SearchComponent,
    LeaguesComponent,
    CountriesComponent,
    FavoriteComponent,
    TeamComponent,
    FilterPipe,
    SplitPipe,
    LoaderComponent,
    PlayerComponent
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
