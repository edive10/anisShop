import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HeaderComponent } from './header/header.component';
import { Recipes } from './recipes/recipes';
import { RecipeList } from './recipes/recipe-list/recipe-list';
import { RecipeDetail } from './recipes/recipe-detail/recipe-detail';
import { RecipeItem } from './recipes/recipe-list/recipe-item/recipe-item';
import { ShoppingList } from './shopping-list/shopping-list';
import { ShoppingEdit } from './shopping-list/shopping-edit/shopping-edit';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping.list.service';
import { RecipeStart } from './recipes/recipe-start/recipe-start';
import { RecipeEdit } from './recipes/recipe-edit/recipe-edit';
import { RecipeService } from './recipes/recipe.service';
import { BookImages } from './recipes/book-images/book-images';

@NgModule({
  declarations: [
    App,
    HeaderComponent,
    Recipes,
    RecipeList,
    RecipeDetail,
    RecipeItem,
    ShoppingList,
    ShoppingEdit,
    DropdownDirective,
    RecipeStart,
    RecipeEdit,
    BookImages,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [provideBrowserGlobalErrorListeners(), ShoppingListService, RecipeService],
  bootstrap: [App],
})
export class AppModule {}
