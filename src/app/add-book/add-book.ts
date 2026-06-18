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
  selectedFile!: File;
  successMessage = '';
  errorMessage = '';

  constructor(private bookService: BookService) { }

 onSubmit() {

  const formData = new FormData();

  formData.append('name', this.book.name);
  formData.append('author', this.book.author);
  formData.append('description', this.book.description);
  formData.append('price', this.book.price.toString());
  formData.append('category', this.book.category);
  formData.append('stock', this.book.stock.toString());
  formData.append('pages', this.book.pages.toString());
  formData.append('language', this.book.language);

  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  this.bookService.addBook(formData).subscribe({
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
