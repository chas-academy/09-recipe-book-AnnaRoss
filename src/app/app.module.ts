import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/* Recipes */
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-item/recipe-item.component';
import { RecipeItemDetailsComponent } from './recipes/recipe-item-details/recipe-item-details.component';
import { RecipeService } from './recipe.service';

/* Todo: implement registered user feature*/
/* import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { UserService } from './user.service'; */

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeItemDetailsComponent
    /* UserComponent,
    RegisterComponent */
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [RecipeService /*  AuthService, UserService */],
  bootstrap: [AppComponent]
})
export class AppModule {}
