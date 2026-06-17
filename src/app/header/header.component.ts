import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { RecipeService } from '../recipes/recipe.service'; // مسیر را چک کنید
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isMenuCollapsed = true;
  @Output() cartToggle = new EventEmitter<void>();

  cartCount = 0;
  searchQuery: string = '';
  constructor(private cartService: CartService) { }
  ngOnInit(): void {

    this.cartService.items$.subscribe(items => {
      this.cartCount = items.reduce(
        (count, item) => count + item.quantity,
        0
      );
    });

  }
  updateCartCount() {
    this.cartCount = this.cartService.getItemCount();
  }
  openCart() {
    this.cartToggle.emit();
  }
  onToggleCart() {
    this.cartToggle.emit();
  }

}
