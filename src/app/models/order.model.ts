export interface OrderItem {
  bookId: string;
  title: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id?: string;
  customerName: string;
  email: string;
  address: string;
  phone?: string;
  items: OrderItem[];
  totalPrice: number;
  status?: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt?: string;
}
