import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Recipe, RecipeDetail } from './recipes/recipe.model';

@Injectable()
export class RecipeService {
  private _baseURL: string = 'http://api.yummly.com/v1/api';
  private _yumKey: string = 'b2e117c4ebea1f52c10378f8ee2a2450';
  private _yumId: string = 'b1e5b0df';
  protected courseSelection = '';
  protected recipes: Recipe[];

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    let params = {
      requirePictures: true,
      'allowedCourse[]': `course^course-${this.courseSelection}`
    };

    return this.http
      .get(`${this._baseURL}/recipes?${this.urlEncodeData(params)}`, {
        headers: {
          'X-Yummly-App-Key': this._yumKey,
          'X-Yummly-App-ID': this._yumId
        }
      })
      .map((res: any[]) => res['matches'].map(recipe => new Recipe(recipe)));
  }

  urlEncodeData(data) {
    return Object.keys(data)
      .map(key => {
        return [key, data[key]].map(encodeURIComponent).join('=');
      })
      .join('&');
  }

  setCourseSelection(course) {
    this.courseSelection = course;
  }

  getRecipeById(id: string): Observable<RecipeDetail> {
    return this.http
      .get(`${this._baseURL}/recipe/${id}`, {
        headers: {
          'X-Yummly-App-Key': this._yumKey,
          'X-Yummly-App-ID': this._yumId
        }
      })
      .map((res: any) => new RecipeDetail(res));
  }
}
