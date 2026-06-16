import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { CartItem } from './cart-item.model';
import { Recipe } from '../recipes/recipe.model';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartChanged = new Subject<CartItem[]>();

  private items: CartItem[] = [];

  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  // در ابتدای کلاس، متد لود کردن داده‌ها را اضافه کنید
  constructor() {
    const savedCart = localStorage.getItem('cart_items');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
      this.itemsSubject.next([...this.items]); // بروزرسانی اولیه
    }
  }

  // متد updateCart را به این شکل اصلاح کنید
  private updateCart() {
    this.itemsSubject.next([...this.items]);
    // ذخیره در LocalStorage با هر تغییر
    localStorage.setItem('cart_items', JSON.stringify(this.items));
  }

  getItems() {
    return this.items.slice();
  }

  getItemsCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }


  addToCart(recipe: Recipe, id: number) {
    const existingItem = this.items.find(item => item.id === id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({
        id: id,
        name: recipe.name,
        price: recipe.price,
        imagePath: recipe.imagePath,
        quantity: 1
      });
    }

    this.updateCart();
  }


  increaseQuantity(id: number) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.quantity++;
      this.updateCart();
    }
  }

  decreaseQuantity(id: number) {
    const item = this.items.find(i => i.id === id);

    if (!item) return;

    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeItem(id);
      return;
    }

    this.updateCart();
  }

  removeItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
    this.updateCart();
  }

  clearCart() {
    this.items = [];
    this.cartChanged.next(this.getItems());
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }
}
