import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { OrderItem } from '../models/order.model';
import { CartService } from '../cart/cart.service';

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

  cartItems: any[] = [];

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();

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
    if (!this.customerName || !this.email || !this.address || this.cartItems.length === 0) {
      alert('Please fill all required fields');
      return;
    }

    // هماهنگ‌سازی فیلدها با مدل دیتابیس (title و bookId)
    const formattedItems = this.cartItems.map(item => ({
      bookId: String(item.id),      // تبدیل id به bookId
      title: item.name,     // تبدیل name به title
      price: item.price,
      quantity: item.quantity,
      imagePath: item.imagePath
    }));

    const orderData = {
      customerName: this.customerName,
      email: this.email,
      address: this.address,
      phone: this.phone,
      items: formattedItems, // استفاده از آیتم‌های اصلاح شده
      totalPrice: this.totalPrice
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (res) => {
        console.log('Order created successfully:', res);
        alert('Order placed successfully');
        this.cartService.clearCart();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Order error:', err);
        alert('Failed to place order. Check console for details.');
      }
    });
  }

}
