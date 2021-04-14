import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { SplitPipe } from './global/split.pipe';
import { FilterPipe } from './global/filter.pipe';

import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { LoaderComponent } from './global/loader/loader.component';
import { LeagueComponent } from './leagues/league/league.component';
import { TeamComponent } from './leagues/league/team/team.component';
import { CountriesComponent } from './countries/countries.component';
import { FavoriteComponent } from './global/favorite/favorite.component';
import { PlayerInfoComponent } from './players/player-info/player-info.component';
import { ApiInterceptor } from './global/api.interceptor.service';

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
    PlayersComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
