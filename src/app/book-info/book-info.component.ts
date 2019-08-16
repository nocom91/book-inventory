import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromBooksAction from '../store/books.actions';
import * as fromBooks from '../store';

import { Book, IBook } from '../models/book.model';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {

  private bookId: number;
  public selectedBook: Book;
  constructor(
    private route: ActivatedRoute,
    private store: Store<IBook>
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookId = +params['id'];
      this.store.dispatch(fromBooksAction.selectBook({bookId: this.bookId}));
      this.store.select(fromBooks.selectedBook).subscribe(book => this.selectedBook = book);
    });
  }

}
