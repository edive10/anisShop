import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/book';
@Component({
  selector: 'app-add-book',
  standalone: false,
  templateUrl: './add-book.html',
  styleUrl: './add-book.css',
})
export class AddBook {
    book: Book = {
      name: '',
      author: '',
      description: '',
      price: 0,
      image: '',
      category: '',
      stock: 0,
      pages: 0,
      language: ''
    };

  successMessage = '';
  errorMessage = '';

  constructor(private bookService: BookService) { }

  onSubmit() {
    this.bookService.addBook(this.book).subscribe({
      next: (response) => {
        console.log('Book added successfully:', response);
        this.successMessage = 'Book added successfully!';
        this.errorMessage = '';

        this.book = {
          name: '',
          author: '',
          description: '',
          price: 0,
          image: '',
          category: '',
          stock: 0,
          pages: 0,
          language: ''
        };
      },
      error: (error) => {
        console.error('Error adding book:', error);
        this.errorMessage = 'Failed to add book!';
        this.successMessage = '';
      }
    });
  }
}
