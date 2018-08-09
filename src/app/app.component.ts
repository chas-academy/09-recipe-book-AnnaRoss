import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from './user/user.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string;
  public user: User;

  constructor(
    private authService: AuthService,
    private recipeService: RecipeService
  ) {
    this.title = 'fooderino';
  }

  ngOnInit() {
    this.authService.fetchUserById(1).subscribe(result => {
      this.user = result;
      this.recipeService.loadListFromLocalStorage() === undefined &&
        this.recipeService.saveListToLocalStorage(
          `${this.user.listsById['0']}`,
          []
        );
    });
  }
}
