import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  _id?: string;
  name: string;
  author: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  pages: number;
  language: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get<any[]>(
      'http://localhost:3000/books?t=' + new Date().getTime()
    );
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  addBook(formData: FormData): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, formData);
  }
  updateBook(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  deleteBook(id: string) {
    return this.http.delete(`http://localhost:3000/books/${id}`);
  }
}
