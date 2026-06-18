import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { ApiService } from '../services/api.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  standalone: false,
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  books: any[] = [];   // ✅ از API پر میشه

  constructor(
    private cartService: CartService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.loadBooks();
  }

  // ✅ گرفتن کتاب‌ها از بک‌اند
  loadBooks() {
    this.api.getBooks().subscribe({
      next: (data: any) => {
        this.books = data;
      },
      error: (err) => {
        console.error("Error loading books", err);
      }
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
