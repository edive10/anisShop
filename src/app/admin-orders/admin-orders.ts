import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-admin-orders',
  standalone: false,
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css',
})
export class AdminOrders implements OnInit {
  orders: any[] = [];
  loading = true;
  errorMessage = '';

  statuses = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.loadOrders();
  }
  loadOrders() {
    this.loading = true;

    this.orderService.getOrders().subscribe({
      next: (data: any) => {
        console.log('Orders loaded:', data);

        this.orders = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);

        this.errorMessage = 'Failed to load orders';
        this.loading = false;
      }
    });
  }
  fetchOrders() {
    this.loading = true;
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  changeStatus(orderId: string, event: Event) {
    const target = event.target as HTMLSelectElement;
    const newStatus = target.value;

    this.orderService.updateOrderStatus(orderId, newStatus).subscribe({
      next: () => {
        this.loadOrders();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update status');
      }
    });
  }
}
