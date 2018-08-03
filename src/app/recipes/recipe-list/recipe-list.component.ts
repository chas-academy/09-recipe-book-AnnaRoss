import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../recipe.service';
import { diets, allergies } from '../../../assets/searchParameters';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public allRecipes: Recipe[];
  public sortedRecipes = {};
  private resultFilterParams = {
    course: undefined
  };
  private allergyFilters = new Set();
  private dietFilters = new Set();
  public dietOptions = diets;
  public allergyOptions = allergies;

  constructor(private recipeService: RecipeService) {}

  public ngOnInit() {
    this.getRecipes();
  }

  getRecipes() {
    let options = {
      allergies: Array.from(this.allergyFilters),
      diets: Array.from(this.dietFilters)
    };

    this.recipeService.fetchRecipes(options).subscribe(result => {
      this.allRecipes = result;
      this.sortedRecipes = this.distinguishRecipesByCourse(result);
    });
  }

  distinguishRecipesByCourse = arrayOfData => {
    let result = arrayOfData.reduce((set, element) => {
      set[element.course] = set[element.course] || [];
      set[element.course].push(element);
      return set;
    }, {});

    return result;
  };

  getRecipesByCourse(): Recipe[] {
    return this.resultFilterParams.course
      ? this.sortedRecipes[this.resultFilterParams.course]
      : this.allRecipes;
  }

  handleClickedFilterOption(typeOfFilter, value, isChecked) {
    switch (typeOfFilter) {
      case 'course':
        this.resultFilterParams.course = value;
        break;
      case 'allergy':
        this.updateAllergyFilters(value, isChecked);
        break;
      case 'diet':
        this.updateDietFilters(value, isChecked);
        break;
      default:
        return;
    }
  }

  updateAllergyFilters(value, isChecked) {
    isChecked
      ? this.allergyFilters.add(value)
      : this.allergyFilters.delete(value);
    this.getRecipes();
  }

  updateDietFilters(value, isChecked) {
    isChecked ? this.dietFilters.add(value) : this.dietFilters.delete(value);
    this.getRecipes();
  }
}
