import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  { path: 'recipes', component: RecipeListComponent },
  { path: 'user/register', component: RegisterComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
