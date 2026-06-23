import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  constructor() {

    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000
    });

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
      this.socket.on('booksChanged', (data) => {
        console.log('📡 booksChanged received', data);
        observer.next(data);
      });
    });
  }

  // ✅ برای سفارش جدید
  onNewOrder(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('new-order', (data) => {
        console.log('📦 new order received', data);
        observer.next(data);
      });
    });
  }

}
