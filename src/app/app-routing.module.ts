import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';

import { RecipeItemDetailsComponent } from './recipes/recipe-item-details/recipe-item-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    component: RecipeListComponent
  },
  {
    path: 'recipes/:id',
    component: RecipeItemDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
