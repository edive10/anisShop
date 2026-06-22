import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { OrderItem } from "../models/order.model";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  cartChanged = new Subject<OrderItem[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', "5"),
    new Ingredient('Tomatos', "10"),
  ];
  private items: OrderItem[] = [];
  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  setIngredients(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  clearIngredients() {
    this.ingredients = [];
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  getItems() {
    return this.items.slice();
  }

  addItem(item: OrderItem) {
    const existingItem = this.items.find(cartItem => cartItem.bookId === item.bookId);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.items.push(item);
    }

    this.cartChanged.next(this.items.slice());
  }


  setItems(items: OrderItem[]) {
    this.items = items;
    this.cartChanged.next(this.items.slice());
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
    this.cartChanged.next(this.items.slice());
  }

  clearItems() {
    this.items = [];
    this.cartChanged.next(this.items.slice());
  }
}
