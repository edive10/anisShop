import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  createOrder(order: Order): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }

  getOrders() {
    const token = localStorage.getItem('adminToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    const token = localStorage.getItem('adminToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.patch(`${this.apiUrl}/${orderId}/status`, { status }, { headers });
  }
}
