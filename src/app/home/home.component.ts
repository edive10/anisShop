import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { BookService } from '../book.service';
import { SocketService } from '../services/socketService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  standalone: false,
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private booksChangedSub?: Subscription;
  private booksUpdatedSub?: Subscription;

  books: any[] = [];
  bestSellers: any[] = [];
  newArrivals: any[] = [];

  constructor(
    private cartService: CartService,
    private bookService: BookService,
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.loadBooks();

    // اگر در همان تب از Admin به Home برگردی، این هم کمک می‌کند.
    this.booksUpdatedSub = this.bookService.booksUpdated$.subscribe(() => {
      this.loadBooks();
    });

    // وقتی بک‌اند با Socket.io اعلام کند کتاب‌ها تغییر کرده‌اند، Home آپدیت می‌شود.
    this.booksChangedSub = this.socketService.onBooksChanged().subscribe(() => {
      console.log('Books changed from socket');
      this.loadBooks();
    });
  }

  // اگر Home در تب جدا باز باشد، با فوکوس شدن تب دوباره اطلاعات را می‌گیرد.
  @HostListener('window:focus')
  onFocus() {
    this.loadBooks();
  }

  hasDiscount(book: any): boolean {
    return Number(book.discount) > 0;
  }

  getDiscountedPrice(book: any): number {
    const price = Number(book.price) || 0;
    const discount = Number(book.discount) || 0;

    return Math.round(price - (price * discount / 100));
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (data: any[]) => {
        this.books = data.filter(book => book.isActive);

        this.bestSellers = this.books.filter(book => book.isBestSeller);

        this.newArrivals = this.books.filter(book => book.isNewArrival);
      },
      error: (error) => {
        console.error('Error loading books:', error);
      }
    });
  }

  addToCart(book: any) {
    const recipeData = {
      name: book.name,
      price: this.hasDiscount(book) ? this.getDiscountedPrice(book) : Number(book.price),
      imagePath: book.image || '',
      description: book.description || ''
    };

    const bookId = book._id || book.id;

    this.cartService.addToCart(recipeData as any, bookId);

    alert(book.name + ' به سبد خرید اضافه شد!');
  }

  ngOnDestroy() {
    this.booksChangedSub?.unsubscribe();
    this.booksUpdatedSub?.unsubscribe();
  }
}
