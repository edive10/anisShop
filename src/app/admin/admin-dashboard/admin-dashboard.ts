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
    if (!this.newBook.name?.trim() || !this.newBook.author?.trim()) {
      this.showError('نام کتاب و نویسنده نمی‌تواند خالی باشد');
      return;
    }
    if (this.newBook.price < 0) {
      this.showError('قیمت نمی‌تواند منفی باشد');
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
    fd.append('isActive', 'true');

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
    this.newBook = { name: '', author: '', price: 0, discount: 0 };
    this.selectedFile = null;
  }

  // متد ویرایش کلی کتاب
  updateBook(book: any) {
    const { _id, __v, ...dataWithoutId } = book;

    // اطمینان از فرمت اعداد برای جلوگیری از خطای ۵۰۰ بک‌هند
    const payload = {
      ...dataWithoutId,
      price: Number(book.price),
      stock: Number(book.stock || 0),
      pages: Number(book.pages || 0),
      discount: Number(book.discount || 0)
    };

    this.bookService.updateBook(_id, payload).subscribe({
      next: () => {
        this.showSuccess('تغییرات با موفقیت ذخیره شد');
        this.getBooks();
      },
      error: (err) => {
        console.error(err);
        this.showError('خطا در ذخیره تغییرات');
      }
    });
  }

  // متد فعال/غیرفعال سازی سریع
  toggleActive(book: any) {
    const currentStatus = book.isActive === true;
    const newStatus = !currentStatus;

    this.bookService.toggleBookActive(book._id, newStatus).subscribe({
      next: (updatedBook: any) => {
        book.isActive = updatedBook.isActive;
        this.showSuccess(newStatus ? 'کتاب فعال شد' : 'کتاب غیرفعال شد');
      },
      error: (err) => {
        console.error('Toggle active error:', err);
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
      }
    });
  }

  showSuccess(message: string) {
    this.successMessage = message;
    setTimeout(() => this.successMessage = '', 3000);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = '', 4000);
  }
}
