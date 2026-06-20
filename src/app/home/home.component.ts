import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { ApiService } from '../services/api.services';
import { BookService } from '../book.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  standalone: false,
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  books: any[] = [];   // ✅ از API پر میشه
  bestSellers: any[] = [];
  newArrivals: any[] = [];
  constructor(
    private cartService: CartService,
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    private bookService: BookService,
    private router: Router
  ) { }
  @HostListener('window:focus')
  onFocus() {
    this.loadBooks();
  }
  ngOnInit() {
    this.loadBooks();

    // ✅ هر بار مسیر عوض شد دوباره داده بگیر
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadBooks();
      });

  }

  // ✅ گرفتن کتاب‌ها از بک‌اند
  loadBooks() {
    this.bookService.getBooks().subscribe((data: any[]) => {

      // فقط کتاب‌های فعال
      this.books = data.filter(b => b.isActive);

      // پرفروش‌ها
      this.bestSellers = this.books.filter(b => b.isBestSeller);

      // جدیدترین‌ها
      this.newArrivals = this.books.filter(b => b.isNewArrival);

    });
  }

  // ✅ اضافه کردن به سبد خرید
  addToCart(book: any) {

    const recipeData = {
      name: book.name,      // چون تو backend اسمش name هست
      price: book.price,
      imagePath: book.image || '',
      description: book.description || ''
    };

    const bookId = book.id;

    this.cartService.addToCart(recipeData as any, bookId);

    alert(book.name + " به سبد خرید اضافه شد!");
  }

}
