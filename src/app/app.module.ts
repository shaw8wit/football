import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SplitPipe } from './global/split.pipe';
import { FilterPipe } from './global/filter.pipe';

import { AppComponent } from './app.component';
import { TeamComponent } from './team/team.component';
import { PlayerComponent } from './player/player.component';
import { SearchComponent } from './search/search.component';
import { LeagueComponent } from './league/league.component';
import { CountriesComponent } from './countries/countries.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { LoaderComponent } from './global/loader/loader.component';
import { TeamInfoComponent } from './team/team-info/team-info.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    SearchComponent,
    LeagueComponent,
    CountriesComponent,
    FavoriteComponent,
    TeamInfoComponent,
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
