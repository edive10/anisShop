import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.html',
  standalone:false,
  styleUrls: ['./admin-orders.css']
})
export class AdminOrders implements OnInit {
  orders: any[] = [];
  loading = false;
  errorMessage = '';

  statuses = [
    'pending',
    'paid',
    'processing',
    'shipped',
    'delivered',
    'cancelled'
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    
    this.loading = true;

    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'خطا در دریافت سفارش‌ها';
        this.loading = false;
      }
    });
  }

  changeStatus(orderId: string, status: string): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe({
      next: () => {
        this.loadOrders();
      },
      error: (error) => {
        console.error(error);
        alert('خطا در تغییر وضعیت سفارش');
      }
    });
  }
}
