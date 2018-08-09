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
  public sortedRecipes: Object;
  public resultFilterParams;
  public allergyFilters;
  public dietFilters;
  public dietOptions;
  public allergyOptions;
  public savedRecipes;

  constructor(private recipeService: RecipeService) {
    this.sortedRecipes = {};
    this.resultFilterParams = { course: undefined };
    this.allergyFilters = new Set();
    this.dietFilters = new Set();
    this.dietOptions = [
      '389^Ovo vegetarian',
      '387^Lacto-ovo vegetarian',
      '386^Vegan',
      '388^Lacto vegetarian',
      '390^Pescetarian',
      '403^Paleo'
    ];

    this.allergyOptions = [
      '393^Gluten-Free',
      '394^Peanut-Free',
      '398^Seafood-Free',
      '399^Sesame-Free',
      '396^Dairy-Free',
      '400^Soy-Free',
      '397^Egg-Free',
      '401^Sulfite-Free',
      '395^Tree Nut-Free',
      '392^Wheat-Free'
    ];
  }

  public ngOnInit() {
    this.getRecipes();
  }

  getRecipes() {
    const options = {
      allergies: Array.from(this.allergyFilters),
      diets: Array.from(this.dietFilters)
    };

    this.recipeService.fetchRecipes(options).subscribe(result => {
      this.allRecipes = result;
      this.sortedRecipes = this.distinguishRecipesByCourse(result);
    });
  }

  distinguishRecipesByCourse = arrayOfData => {
    const result = arrayOfData.reduce((set, element) => {
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
