import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input()
  recipe: Recipe;
  public isSaved: boolean;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipe.favourite ? (this.isSaved = true) : (this.isSaved = false);
    this.getFavouriteRecipes();
  }

  getFavouriteRecipes() {
    this.recipeService.getFavouriteRecipes().subscribe(recipes => {
      this.isSaved = recipes.includes(this.recipe.id);
    });
  }

  saveRecipe(id) {
    this.recipeService.saveRecipeToList(id);
  }

  removeRecipe(id) {
    this.recipeService.removeRecipeFromList(id);
  }
}
