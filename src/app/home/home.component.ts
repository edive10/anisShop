import { Component, OnInit, OnDestroy, HostListener, NgZone, ChangeDetectorRef } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { BookService } from '../book.service';
import { SocketService } from '../services/socketService';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shopping.list.service';

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
    private shoppingListService: ShoppingListService,
    private bookService: BookService,
    private socketService: SocketService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadBooks();

    this.booksUpdatedSub = this.bookService.booksUpdated$.subscribe(() => {
      this.loadBooks();
    });

    this.booksChangedSub = this.socketService.onBooksChanged().subscribe(() => {
      console.log('Books changed from socket');

      this.zone.run(() => {
        this.loadBooks();
      });
    });
  }

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
        console.log('BOOKS LOADED:', data);

        this.books = data.filter(book => book.isActive === true || book.isActive === 'true');

        this.bestSellers = this.books.filter(book => book.isBestSeller === true || book.isBestSeller === 'true');

        this.newArrivals = this.books.filter(book => book.isNewArrival === true || book.isNewArrival === 'true');

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading books:', error);
      }
    });
  }

  addToCart(book: any) {
    const price = this.hasDiscount(book)
      ? this.getDiscountedPrice(book)
      : Number(book.price);

    const bookId = book._id || book.id;

    const recipeData = {
      name: book.title || book.name,
      price: price,
      imagePath: book.image || '',
      description: book.description || ''
    };

    this.cartService.addToCart(recipeData as any, bookId);

    this.shoppingListService.addItem({
      bookId: bookId,
      title: book.title || book.name,
      price: price,
      quantity: 1
    });

    alert((book.title || book.name) + ' به سبد خرید اضافه شد!');
  }

  ngOnDestroy() {
    this.booksChangedSub?.unsubscribe();
    this.booksUpdatedSub?.unsubscribe();
  }
}
