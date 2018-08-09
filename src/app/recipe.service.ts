import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Recipe } from './recipes/recipe.model';
import { AuthService } from './auth.service';
import { List } from './user/list.model';

@Injectable()
export class RecipeService {
  private _baseURL: string = 'http://api.yummly.com/v1/api';
  private _yumHeaders;
  public favourites: Subject<string[]>;
  public storage;
  public list;
  public faves;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.favourites = new Subject<string[]>();
    this.storage = window.localStorage;
    this.list = this.loadListFromLocalStorage();
    this.faves = this.list !== undefined ? this.list.recipesById : [];
    this._yumHeaders = {
      'X-Yummly-App-Key': 'b2e117c4ebea1f52c10378f8ee2a2450',
      'X-Yummly-App-ID': 'b1e5b0df'
    };
  }

  getFavouriteRecipes() {
    return this.favourites.asObservable();
  }

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
        map((result: any[]) =>
          result['matches'].map(recipe => {
            return new Recipe(this.assignFavouritePropertyAndValue(recipe));
          })
        ),
        catchError(this.handleError([]))
      );
  }

  fetchRecipeById(recipeId: string): Observable<Recipe> {
    return this.http
      .get(`${this._baseURL}/recipe/${recipeId}`, {
        headers: this._yumHeaders
      })
      .map((recipe: any) => {
        return new Recipe(this.assignFavouritePropertyAndValue(recipe));
      });
  }

  assignFavouritePropertyAndValue(recipeToCopy) {
    let recipeWithFavouriteProperty =
      this.faves && this.faves.includes(recipeToCopy.id)
        ? Object.assign({ favourite: true }, recipeToCopy)
        : recipeToCopy;
    return recipeWithFavouriteProperty;
  }

  fetchListById(listId = 'favourites') {
    return this.http
      .get(`http://5b681bf7629e280014570cad.mockapi.io/lists/${listId}`)
      .map((result: any) => {
        return new List(result);
      });
  }

  saveRecipeToList(recipeId, listId = 'favourites') {
    if (this.faves === undefined) return;
    if (this.faves.includes(recipeId)) return;

    this.faves = [...this.faves, recipeId];

    this.saveListToLocalStorage(listId, this.faves);
    this.favourites.next(this.faves);
  }

  removeRecipeFromList(recipeId, listId = 'favourites') {
    this.faves = this.faves.filter(id => id !== recipeId);

    this.saveListToLocalStorage(listId, this.faves);
    this.favourites.next(this.faves);
  }

  saveListToLocalStorage = (id, recipesById, nameOfKey = 'list') => {
    let listToSave = { id: id, recipesById: recipesById };
    try {
      const stringifiedList = JSON.stringify(listToSave);
      this.storage.setItem(nameOfKey, stringifiedList);
    } catch (error) {
      return undefined;
    }
  };

  loadListFromLocalStorage = (itemToGet = 'list') => {
    try {
      const savedList = this.storage.getItem(itemToGet);
      if (savedList === null) {
        return undefined;
      }
      return JSON.parse(savedList);
    } catch (error) {
      return undefined;
    }
  };

  handleError(result?) {
    return error => {
      console.error(error);
      return result;
    };
  }
}
