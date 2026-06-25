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

  successMessage = '';
  errorMessage = '';

  confirmDeleteBookId: string | null = null;
  confirmDeleteBookName = '';

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
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  setSection(section: AdminSection) {
    this.activeSection = section;
  }

  getBooks() {
    this.bookService.getBooks().subscribe({
      next: (data: any) => {
        this.books = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.showError('خطا در دریافت لیست کتاب‌ها');
      }
    });
  }

  logout() {
    localStorage.removeItem('adminToken');
    this.router.navigate(['/login']);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
  }

  addBook() {
    if (!this.newBook.name || !this.newBook.name.trim()) {
      this.showError('نام کتاب نمی‌تواند خالی باشد');
      return;
    }

    if (!this.newBook.author || !this.newBook.author.trim()) {
      this.showError('نام نویسنده نمی‌تواند خالی باشد');
      return;
    }

    if (this.newBook.price < 0) {
      this.showError('قیمت نمی‌تواند منفی باشد');
      return;
    }

    if (this.newBook.discount < 0 || this.newBook.discount > 100) {
      this.showError('تخفیف باید بین ۰ تا ۱۰۰ باشد');
      return;
    }

    if (!this.selectedFile) {
      this.showError('لطفاً تصویر کتاب را انتخاب کنید');
      return;
    }

    const fd = new FormData();

    fd.append('name', this.newBook.name.trim());
    fd.append('author', this.newBook.author.trim());
    fd.append('price', this.newBook.price.toString());
    fd.append('discount', this.newBook.discount.toString());
    fd.append('image', this.selectedFile);

    this.bookService.addBook(fd).subscribe({
      next: () => {
        this.showSuccess('کتاب با موفقیت اضافه شد');
        this.getBooks();
        this.resetAddBookForm();
        this.activeSection = 'books';
      },
      error: (err) => {
        console.error(err);
        this.showError('خطا در افزودن کتاب');
      }
    });
  }

  resetAddBookForm() {
    this.newBook = {
      name: '',
      author: '',
      price: 0,
      discount: 0
    };

    this.selectedFile = null;
  }

  showSuccess(message: string) {
    this.successMessage = message;
    this.errorMessage = '';

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  showError(message: string) {
    this.errorMessage = message;
    this.successMessage = '';

    setTimeout(() => {
      this.errorMessage = '';
    }, 4000);
  }

  updateBook(book: any) {
    if (!book.name || !book.name.trim()) {
      this.showError('نام کتاب نمی‌تواند خالی باشد');
      return;
    }

    if (!book.author || !book.author.trim()) {
      this.showError('نام نویسنده نمی‌تواند خالی باشد');
      return;
    }

    if (book.price < 0) {
      this.showError('قیمت نمی‌تواند منفی باشد');
      return;
    }

    if (book.discount < 0 || book.discount > 100) {
      this.showError('تخفیف باید بین ۰ تا ۱۰۰ باشد');
      return;
    }

    const updatedBook = {
      ...book,
      name: book.name.trim(),
      author: book.author.trim()
    };

    this.bookService.updateBook(book._id, updatedBook).subscribe({
      next: () => {
        this.showSuccess('کتاب با موفقیت ذخیره شد');
        this.getBooks();
      },
      error: (err) => {
        console.error(err);
        this.showError('خطا در ذخیره تغییرات کتاب');
      }
    });
  }

  toggleActive(book: any) {
    const previousStatus = book.isActive;

    book.isActive = !book.isActive;

    this.bookService.updateBook(book._id, book).subscribe({
      next: () => {
        this.showSuccess(
          book.isActive
            ? 'کتاب فعال شد'
            : 'کتاب غیرفعال شد'
        );
        this.getBooks();
      },
      error: (err) => {
        console.error(err);
        book.isActive = previousStatus;
        this.showError('خطا در تغییر وضعیت کتاب');
      }
    });
  }

  askDeleteBook(book: any) {
    this.confirmDeleteBookId = book._id;
    this.confirmDeleteBookName = book.name;
  }

  cancelDeleteBook() {
    this.confirmDeleteBookId = null;
    this.confirmDeleteBookName = '';
  }

  confirmDeleteBook() {
    if (!this.confirmDeleteBookId) return;

    this.bookService.deleteBook(this.confirmDeleteBookId).subscribe({
      next: () => {
        this.showSuccess('کتاب با موفقیت حذف شد');
        this.getBooks();
        this.cancelDeleteBook();
      },
      error: (err) => {
        console.error(err);
        this.showError('خطا در حذف کتاب');
        this.cancelDeleteBook();
      }
    });
  }
}
