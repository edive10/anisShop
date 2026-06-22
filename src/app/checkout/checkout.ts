import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { OrderItem } from '../models/order.model';
import { ShoppingListService } from '../shopping-list/shopping.list.service';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  customerName = '';
  email = '';
  address = '';
  phone = '';

  cartItems: OrderItem[] = [];

  constructor(
    private orderService: OrderService,
    private shoppingListService: ShoppingListService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartItems = this.shoppingListService.getItems();

    console.log('Cart Items:', this.cartItems);
    console.log('Cart Items Length:', this.cartItems.length);
  }

  get totalPrice(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  placeOrder() {
    console.log('Customer Name:', this.customerName);
    console.log('Email:', this.email);
    console.log('Address:', this.address);
    console.log('Cart Items Length:', this.cartItems.length);

    if (!this.customerName || !this.email || !this.address || this.cartItems.length === 0) {
      alert('Please fill all required fields');
      return;
    }

    const orderData = {
      customerName: this.customerName,
      email: this.email,
      address: this.address,
      phone: this.phone,
      items: this.cartItems,
      totalPrice: this.totalPrice
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (res) => {
        console.log('Order created:', res);
        alert('Order placed successfully');

        this.shoppingListService.clearItems();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Order error:', err);
        alert('Failed to place order');
      }
    });
  }
}
