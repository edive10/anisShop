import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isMenuCollapsed = true;
  @Output() cartToggle = new EventEmitter<void>();

  cartCount = 0;
  isAdmin = false; // متغیر جدید برای تشخیص ادمین

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // بررسی ادمین بودن (فرض بر این است که نقش در localStorage ذخیره شده)
    const userRole = localStorage.getItem('role');
    this.isAdmin = (userRole === 'admin');

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

  // متد کمکی برای خروج
  logout() {
    localStorage.removeItem('adminToken'); // یا هر کلیدی که دارید
    localStorage.removeItem('role');
    this.isAdmin = false;
    window.location.href = '/'; // هدایت به صفحه اصلی
  }
}
