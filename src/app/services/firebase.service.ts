import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import * as fromBooks from '../store/books.actions';

import { Book, IBook } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private host: string = 'https://book-inventory-acd5e.firebaseio.com/books.json';
  constructor(private http: HttpClient, private store: Store<IBook>) {  }

  getBooks() {
   this.http.get<Book[]>(this.host)
   .subscribe(response => this.store.dispatch(fromBooks.setBooks({books: response})));
  }

}
