import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from './cart-item.model';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartChanged = new Subject<CartItem[]>();

  private items: CartItem[] = [];

  getItems() {
    return this.items.slice();
  }

  getItemsCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  addToCart(recipe: Recipe, id: number) {
    const existingItem = this.items.find(item => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push(
        new CartItem(
          id,
          recipe.name,
          recipe.price,
          recipe.imagePath,
          1
        )
      );
    }

    this.cartChanged.next(this.getItems());
  }

  increaseQuantity(id: number) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.quantity += 1;
      this.cartChanged.next(this.getItems());
    }
  }

  decreaseQuantity(id: number) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.quantity -= 1;

      if (item.quantity <= 0) {
        this.removeItem(id);
      } else {
        this.cartChanged.next(this.getItems());
      }
    }
  }

  removeItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
    this.cartChanged.next(this.getItems());
  }

  clearCart() {
    this.items = [];
    this.cartChanged.next(this.getItems());
  }
}
