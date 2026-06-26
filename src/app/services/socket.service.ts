import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;
  http: any;

  constructor() {
    this.socket = io('http://localhost:3000');

    this.socket.on('connect', () => {
      console.log('✅ Socket connected:', this.socket.id);
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });
  }

  // برای تغییرات کتاب‌ها (اگر هنوز استفاده می‌کنی)
  onBooksChanged(): Observable<any> {
    return new Observable(observer => {
      const handler = (data: any) => {
        console.log('📡 booksChanged received', data);
        observer.next(data);
      };

      this.socket.on('booksChanged', handler);

      return () => {
        this.socket.off('booksChanged', handler);
      };
    });
  }

  // ✅ برای سفارش جدید
  onNewOrder(): Observable<any> {
    return new Observable(observer => {
      const handler = (data: any) => {
        console.log('📦 new order received', data);
        observer.next(data);
      };

      this.socket.on('new-order', handler);

      return () => {
        this.socket.off('new-order', handler);
      };
    });
  }
  updateBook(id: string, data: any): Observable<any> {
    const token = localStorage.getItem('token'); // یا هر جایی که توکن را ذخیره می‌کنید
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`http://localhost:3000/books/${id}`, data, { headers });
  }
}
