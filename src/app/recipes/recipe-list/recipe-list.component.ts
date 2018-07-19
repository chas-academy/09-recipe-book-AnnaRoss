import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  public ngOnInit() {
    this.getRecipes();
  }

  handleSearchParams(value) {
    this.recipeService.setCourseSelection(value);
    this.getRecipes();
  }

  getRecipes() {
    this.recipeService.getRecipes().subscribe(data => (this.recipes = data));
  }
}
