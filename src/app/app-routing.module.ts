import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { LeagueComponent } from './league/league.component';


const routes: Routes = [
  { path: '', redirectTo: '/country', pathMatch: 'full' },
  { path: 'country', component: CountryComponent },
  { path: 'league', component: LeagueComponent },
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
