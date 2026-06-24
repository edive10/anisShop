import { Component, OnInit, NgZone, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Subscription } from 'rxjs';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.html',
  standalone: false,
  styleUrls: ['./admin-orders.css']
})
export class AdminOrders implements OnInit, OnDestroy {
  orders: any[] = [];
  loading = false;
  errorMessage = '';

  private newOrderSub?: Subscription;

  statuses = [
    'pending',
    'paid',
    'processing',
    'shipped',
    'delivered',
    'cancelled'
  ];

  constructor(
    private orderService: OrderService,
    private socketService: SocketService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadOrders();

    this.newOrderSub = this.socketService.onNewOrder().subscribe(() => {
      console.log('New order received');

      this.ngZone.run(() => {
        this.loadOrders();
      });
    });
  }

  ngOnDestroy(): void {
    this.newOrderSub?.unsubscribe();
  }

  loadOrders(): void {
    console.log('loadOrders called');
    this.loading = true;

    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'خطا در دریافت سفارش‌ها';
        this.loading = false;
        this.cdr.detectChanges();
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
