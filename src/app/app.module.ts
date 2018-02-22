import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ClarityModule } from "@clr/angular";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/* Recipes */
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-item/recipe-item.component';
import { RecipeItemDetailsComponent } from './recipes/recipe-item-details/recipe-item-details.component';
import { RecipeService } from './recipe.service';

/* User */
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeItemDetailsComponent,
    UserComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    AppRoutingModule
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
