import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from './cart-item.model';
import { CartService } from './cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  items: CartItem[] = [];
  totalPrice: number = 0;

  private cartSub!: Subscription;

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  constructor(
    private cartService: CartService,
    private router: Router) { }

  ngOnInit() {

    // فقط از stream جدید گوش بده
    this.cartSub = this.cartService.items$.subscribe(items => {
      this.items = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  closeCart() {
    this.close.emit();
  }

  increase(id: number) {
    this.cartService.increaseQuantity(id);
  }

  decrease(id: number) {
    this.cartService.decreaseQuantity(id);
  }

  remove(id: number) {
    this.cartService.removeItem(id);
  }

  clearCart() {
    this.cartService.clearCart();
  }
  goToCheckout() {
    this.closeCart();
    this.router.navigate(['/checkout']);
  }
  ngOnDestroy() {
    if (this.cartSub) this.cartSub.unsubscribe();
  }
}
