import { Component } from '@angular/core';
import { CartService } from '../cart/cart.service'; // مسیر فایل را چک کن
@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  standalone: false,
  styleUrls: ['./home.css']
})
export class HomeComponent {


  constructor(private cartService: CartService) { }
  books = [
    {
      title: 'مهندسی نرم افزار',
      price: 500000,
      image: '../assets/1.jpg'
    },
    {
      title: 'پایگاه داده پیشرفته',
      price: 500000,
      image: '../assets/11.jpg'
    },
    {
      title: 'برنامه نویسی پیشرفته',
      price: 500000,
      image: '../assets/14.jpg'
    }
  ];
  newBooks = [
    {
      title: 'هوش مصنوعی پیشرفته',
      price: 300000,
      image: '../assets/14.jpg'
    },
    {
      title: 'معماری نرم افزار',
      price: 210000,
      image: '../assets/14.jpg'
    },
    {
      title: 'شبکه‌های کامپیوتری',
      price: 195000,
      image: '../assets/14.jpg'
    },
    {
      title: 'امنیت اطلاعات',
      price: 240000,
      image: '../assets/14.jpg'
    },
    {
      title: 'امنیت اطلاعات',
      price: 240000,
      image: '../assets/14.jpg'
    },
    {
      title: 'امنیت اطلاعات',
      price: 240000,
      image: '../assets/14.jpg'
    },
    {
      title: 'امنیت اطلاعات',
      price: 240000,
      image: '../assets/14.jpg'
    },
    {
      title: 'امنیت اطلاعات',
      price: 240000,
      image: '../assets/14.jpg'
    }

  ];
  addToCart(book: any) {
  // تبدیل ساختار کتاب به ساختاری که سرویس شما میفهمد (Recipe)
  const recipeData = {
    name: book.title,
    price: book.price,
    imagePath: book.image,
    description: '' // فیلد توضیحات چون در مدل Recipe احتمالا اجباری است
  };

  // ایجاد یک ID عددی (مثلاً بر اساس طول نام کتاب یا رندوم)
  const bookId = book.title.length + book.price; 

  // فراخوانی سرویس شما با دو ورودی مورد نظرش
  this.cartService.addToCart(recipeData as any, bookId);
  
  alert(book.title + " به سبد خرید اضافه شد!");
}
}
