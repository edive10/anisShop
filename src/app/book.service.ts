import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

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
  private booksUpdated = new BehaviorSubject<boolean>(false);
  booksUpdated$ = this.booksUpdated.asObservable();

  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    const token = localStorage.getItem('adminToken');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  notifyBooksChanged() {
    this.booksUpdated.next(true);
  }

  getBooks() {
    return this.http.get<any[]>(
      'http://localhost:3000/books?t=' + new Date().getTime()
    );
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  addBook(formData: FormData): Observable<Book> {
    return this.http.post<Book>(
      this.apiUrl,
      formData,
      this.getAuthHeaders()
    );
  }

  updateBook(id: string, data: any) {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      data,
      this.getAuthHeaders()
    );
  }

  deleteBook(id: string) {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      this.getAuthHeaders()
    );
  }
}
