import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item-details',
  templateUrl: './recipe-item-details.component.html',
  styleUrls: ['./recipe-item-details.component.css']
})
export class RecipeItemDetailsComponent implements OnInit {
  public recipe: Recipe;
  public id: string;
  public isSaved;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('recipeId');
  }

  ngOnInit() {
    this.getRecipe(this.id);
    this.getFavouriteRecipes();
  }

  getRecipe(id) {
    this.recipeService.fetchRecipeById(id).subscribe(result => {
      result.favourite ? (this.isSaved = true) : (this.isSaved = false);
      this.recipe = result;
    });
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
