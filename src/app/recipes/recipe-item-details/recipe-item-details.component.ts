import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item-details',
  templateUrl: './recipe-item-details.component.html',
  styleUrls: ['./recipe-item-details.component.css']
})

export class RecipeItemDetailsComponent implements OnInit {

  @Input() recipe: Recipe;
  constructor() { }

  ngOnInit() {
  }

}
