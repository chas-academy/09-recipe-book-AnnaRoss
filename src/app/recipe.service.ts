import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Recipe } from './recipes/recipe.model';

@Injectable()
export class RecipeService {
  private _url: string = 'http://fooderino.test/recipes'; // replace with request to api
  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http
      .get('http://demo0002060.mockable.io/recipes')
      .map((res: any[]) => res.map(recipe => new Recipe(recipe)));
  }
}
