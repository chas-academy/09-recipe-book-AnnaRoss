import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipes/recipe.model';

@Component({
  selector: 'app-list',
  template: `
  <div>{{recipes.length}}</div>
  <ul *ngIf="recipes" class="recipes">
  <li *ngFor="let recipe of recipes">
    <app-recipe-item class="recipe-item" [recipe]="recipe"></app-recipe-item>
  </li>
  </ul>
  
  `,
  styles: [
    `
      .recipes {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
      }

      .recipes .recipe-item {
        display: flex;
        justify-content: space-between;
        padding: 1rem 0;
      }
    `
  ]
})
export class ListComponent implements OnInit {
  public listItemsById;
  public listId;
  public recipes: Recipe[];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    this.listId = this.route.snapshot.paramMap.get('listId');
    this.listItemsById = this.recipeService.loadListFromLocalStorage().recipesById;
    this.recipes = [];
  }

  ngOnInit() {
    this.getRecipesById(this.listItemsById);
    this.subscribeToFavourites();
  }

  subscribeToFavourites() {
    this.recipeService.getFavouriteRecipes().subscribe(recipeIds => {
      let recipeIdsToFetch = recipeIds.filter(
        recipeId => !this.listItemsById.includes(recipeId)
      );
      return this.getRecipesById(recipeIdsToFetch);
    });
  }

  getRecipesById(arrayOfRecipeIds) {
    arrayOfRecipeIds.length >= 1 &&
      arrayOfRecipeIds.forEach(recipeId => {
        this.recipeService.fetchRecipeById(recipeId).subscribe(recipe => {
          return (this.recipes = [...this.recipes, recipe]);
        });
      });
  }
}
