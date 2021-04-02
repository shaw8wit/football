import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { LeagueComponent } from './league/league.component';
import { TeamInfoComponent } from './team/team-info/team-info.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  { path: '', redirectTo: '/countries', pathMatch: 'full' },
  { path: 'countries', component: CountriesComponent },
  { path: 'league', component: LeagueComponent },
  { path: 'team', component: TeamComponent },
  { path: 'team-info', component: TeamInfoComponent },
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
