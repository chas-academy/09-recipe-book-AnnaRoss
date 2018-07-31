import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public allRecipes: Recipe[];
  public sortedRecipes;

  private filterParams = {
    course: undefined,
    time: undefined
  };

  constructor(private recipeService: RecipeService) {}

  public ngOnInit() {
    this.getRecipes();
  }

  handleCourseSelected(value) {
    this.filterParams.course = value;
  }

  getRecipes() {
    this.recipeService.fetchRecipes().subscribe(result => {
      this.allRecipes = result;
      this.sortedRecipes = this.sortRecipesByCourse(result);
    });
  }

  sortRecipesByCourse = arrayOfData => {
    let result = arrayOfData.reduce((set, element) => {
      set[element.course] = set[element.course] || [];
      set[element.course].push(element);
      return set;
    }, {});
    return result;
  };

  getRecipesByCourse(): Recipe[] {
    return this.filterParams.course
      ? this.sortedRecipes[this.filterParams.course]
      : this.allRecipes;
  }
}
