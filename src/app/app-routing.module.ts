import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { LeagueComponent } from './league/league.component';
import { TeamInfoComponent } from './team/team-info/team-info.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  { path: '', redirectTo: '/country', pathMatch: 'full' },
  { path: 'country', component: CountryComponent },
  { path: 'league', component: LeagueComponent },
  { path: 'team', component: TeamComponent },
  { path: 'team-info', component: TeamInfoComponent },
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
