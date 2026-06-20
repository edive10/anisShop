import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../app/book.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  books: any[] = [];
  newBook = { name: '', author: '', price: 0, discount: 0 };
  selectedFile: File | null = null;
  constructor(private bookService: BookService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe((data: any) => {
      this.books = data;
      this.cdr.detectChanges(); // ۲. انگولار را مجبور کن صفحه را بروزرسانی کند
    });
  }



  deleteBook(id: string) {

    if (confirm("Are you sure you want to delete this book?")) {

      this.bookService.deleteBook(id).subscribe(() => {
        this.books = this.books.filter(book => book._id !== id);
      });

    }

  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  addBook() {
    const fd = new FormData();
    fd.append('name', this.newBook.name);
    fd.append('author', this.newBook.author);
    fd.append('price', this.newBook.price.toString());
    if (this.selectedFile) fd.append('image', this.selectedFile);

    this.bookService.addBook(fd).subscribe(() => {
      this.getBooks(); // لیست را رفرش کن
      this.newBook = { name: '', author: '', price: 0, discount: 0 }; // فرم را خالی کن
    });
  }

  updateBook(book: any) {
    this.bookService.updateBook(book._id, book).subscribe(() => {
      console.log('کتاب آپدیت شد');
    });
  }

  toggleActive(book: any) {
    book.isActive = !book.isActive;
    this.updateBook(book);
  }
}

