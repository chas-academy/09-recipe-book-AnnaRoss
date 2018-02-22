import { Injectable } from '@angular/core';

import { Recipe } from './recipes/recipe.model';
import { RECIPEDATA } from './dummy';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
@Injectable()
export class RecipeService {

  constructor() { }

  getRecipes(): Observable<Recipe[]> {
    return of(RECIPEDATA); // returns an array of recipe objects
  }
  
  getRecipe(): Observable<Recipe[]> {
    return of()
  }
  
}
