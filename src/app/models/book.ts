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
  createdAt?: Date;
}
