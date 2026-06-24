import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../../app/book.service';

type AdminSection = 'orders' | 'books' | 'add-book';
@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  books: any[] = [];

  newBook = {
    name: '',
    author: '',
    price: 0,
    discount: 0
  };

  selectedFile: File | null = null;

  activeSection: AdminSection = 'orders';

  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  setSection(section: AdminSection) {
    this.activeSection = section;
  }

  getBooks() {
    this.bookService.getBooks().subscribe((data: any) => {
      this.books = data;
      this.cdr.detectChanges();
    });
  }

  logout() {
    localStorage.removeItem('adminToken');
    this.router.navigate(['/login']);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addBook() {
    const fd = new FormData();

    fd.append('name', this.newBook.name);
    fd.append('author', this.newBook.author);
    fd.append('price', this.newBook.price.toString());
    fd.append('discount', this.newBook.discount.toString());

    if (this.selectedFile) {
      fd.append('image', this.selectedFile);
    }

    this.bookService.addBook(fd).subscribe(() => {
      this.getBooks();

      this.newBook = {
        name: '',
        author: '',
        price: 0,
        discount: 0
      };

      this.selectedFile = null;
      this.activeSection = 'books';
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

  deleteBook(id: string) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.books = this.books.filter(book => book._id !== id);
      });
    }
  }
}
