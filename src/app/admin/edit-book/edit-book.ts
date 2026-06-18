import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.html',
  standalone: false,
  styleUrls: ['./edit-book.css']
})
export class EditBook implements OnInit {

  book!: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.bookService.getBookById(id).subscribe(book => {
        this.book = book;
      });
    }

  }

}
