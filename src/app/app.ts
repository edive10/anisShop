import { Component, OnInit, signal } from '@angular/core';
import { CartUiService } from './cart/cart-ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  cartOpen = false;
  constructor(private cartUiService: CartUiService) { }
  ngOnInit(): void {
    this.cartUiService.cartOpen$.subscribe((isOpen) => {
      this.cartOpen = isOpen;
    })
  }
  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }
  closeCart() {
    this.cartUiService.closeCart();
  }
}
