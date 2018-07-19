import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RecipeDetail } from '../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item-details',
  templateUrl: './recipe-item-details.component.html',
  styleUrls: ['./recipe-item-details.component.css']
})
export class RecipeItemDetailsComponent implements OnInit {
  public recipe: RecipeDetail;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getRecipe();
  }

  getRecipe() {
    const id = this.route.snapshot.paramMap.get('id');
    this.recipeService
      .getRecipeById(id)
      .subscribe(data => (this.recipe = data));
  }
}
