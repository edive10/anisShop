export interface Book {
  _id?: string; // آیدی معمولاً در مدل هست
  name: string;
  author: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  pages: number;
  language: string;
  isActive?: boolean; // این خط را اضافه کنید
}
