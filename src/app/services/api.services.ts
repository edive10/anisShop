import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get(this.api + "/books");
  }

  getBook(id: number) {
    return this.http.get(this.api + "/books/" + id);
  }

  getReviews(bookId: number) {
    return this.http.get(this.api + "/books/" + bookId + "/reviews");
  }

  addReview(bookId: number, review: any) {
    return this.http.post(this.api + "/books/" + bookId + "/reviews", review);
  }

}
