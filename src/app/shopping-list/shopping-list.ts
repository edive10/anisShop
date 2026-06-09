import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping.list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  standalone: false,
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.css',
})
export class ShoppingList implements OnInit, OnDestroy {
  ingredients!: Ingredient[];
  private igChangeSub!: Subscription

  constructor(private slService: ShoppingListService) {

  }
  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.igChangeSub = this.slService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      })
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index)
  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
