import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Recipe, RecipeDetail } from './recipes/recipe.model';

@Injectable()
export class RecipeService {
  private _baseURL: string = 'http://api.yummly.com/v1/api';
  private _yumKey: string = 'b2e117c4ebea1f52c10378f8ee2a2450';
  private _yumId: string = 'b1e5b0df';
  private _yumHeaders = {
    'X-Yummly-App-Key': this._yumKey,
    'X-Yummly-App-ID': this._yumId
  };

  constructor(private http: HttpClient) {}

  fetchRecipes({ allergies, diets }): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(`${this._baseURL}/recipes?`, {
        headers: this._yumHeaders,
        params: {
          'allowedCourse[]': [
            'course^course-Desserts',
            'course^course-Main Dishes',
            'course^course-Appetizers'
          ],
          requirePictures: 'true',
          maxResult: '20',
          start: '0',
          'allowedAllergy[]': allergies || undefined,
          'allowedDiet[]': diets || undefined
        }
      })
      .pipe(
        map((response: any[]) =>
          response['matches'].map(recipe => new Recipe(recipe))
        ),
        catchError(this.handleError('fetchRecipes', []))
      );
  }

  fetchRecipeById(id: string): Observable<RecipeDetail> {
    return this.http
      .get(`${this._baseURL}/recipe/${id}`, {
        headers: this._yumHeaders
      })
      .map((res: any) => {
        return new RecipeDetail(res);
      });
  }

  handleError(operation = 'operation', result?) {
    return error => {
      console.error(error);
      return result;
    };
  }
}
