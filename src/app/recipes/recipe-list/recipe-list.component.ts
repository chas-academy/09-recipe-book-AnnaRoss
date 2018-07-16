import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe(data => (this.recipes = data));
  }
}
