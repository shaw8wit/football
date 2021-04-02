import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { TeamComponent } from './leagues/league/team/team.component';
import { LeagueComponent } from './leagues/league/league.component';

const routes: Routes = [
  { path: '', redirectTo: '/countries', pathMatch: 'full' },
  { path: 'countries', component: CountriesComponent },
  { path: 'leagues', component: LeaguesComponent },
  { path: 'league', component: LeagueComponent },
  { path: 'team', component: TeamComponent },
  { path: '*', redirectTo: '/countries' },
];

// path: 'recipes', component: RecipesComponent, children: [
//   { path: '', component: RecipeStartComponent },
//   { path: 'new', component: RecipeEditComponent },
//   { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
//   { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService] },
// ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
