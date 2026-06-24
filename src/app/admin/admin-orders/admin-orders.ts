import { Component, OnInit, NgZone, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
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
  selectedStatus = 'all';

  private newOrderSub?: Subscription;

  statuses = [
    'pending',
    'paid',
    'processing',
    'shipped',
    'delivered',
    'cancelled'
  ];

  statusLabels: Record<string, string> = {
    pending: 'در انتظار بررسی',
    paid: 'پرداخت شده',
    processing: 'در حال آماده‌سازی',
    shipped: 'ارسال شده',
    delivered: 'تحویل داده شده',
    cancelled: 'لغو شده'
  };

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

  get filteredOrders(): any[] {
    if (this.selectedStatus === 'all') {
      return this.orders;
    }

    return this.orders.filter(order => order.status === this.selectedStatus);
  }

  get totalOrders(): number {
    return this.orders.length;
  }

  get pendingOrders(): number {
    return this.orders.filter(order => order.status === 'pending').length;
  }

  get paidOrders(): number {
    return this.orders.filter(order => order.status === 'paid').length;
  }

  get todayOrders(): number {
    const today = new Date().toDateString();

    return this.orders.filter(order => {
      const orderDate = new Date(order.createdAt).toDateString();
      return orderDate === today;
    }).length;
  }

  loadOrders(): void {
    console.log('loadOrders called');
    this.loading = true;
    this.errorMessage = '';

    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = [...orders].sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });

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

  getStatusLabel(status: string): string {
    return this.statusLabels[status] || status;
  }

  formatDate(date: string): string {
    if (!date) {
      return '-';
    }

    return new Date(date).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatPrice(price: number): string {
    if (!price && price !== 0) {
      return '-';
    }

    return new Intl.NumberFormat('fa-IR').format(price);
  }

  trackByOrderId(index: number, order: any): string {
    return order._id || index;
  }
}
