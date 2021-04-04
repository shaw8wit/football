import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { SplitPipe } from './global/split.pipe';
import { FilterPipe } from './global/filter.pipe';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PlayerInfoComponent } from './player-info/player-info.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { LoaderComponent } from './global/loader/loader.component';
import { LeagueComponent } from './leagues/league/league.component';
import { TeamComponent } from './leagues/league/team/team.component';
import { CountriesComponent } from './countries/countries.component';
import { FavoriteComponent } from './global/favorite/favorite.component';

@NgModule({
  declarations: [
    SplitPipe,
    FilterPipe,
    AppComponent,
    TeamComponent,
    LoaderComponent,
    PlayerInfoComponent,
    LeagueComponent,
    LeaguesComponent,
    FavoriteComponent,
    CountriesComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
