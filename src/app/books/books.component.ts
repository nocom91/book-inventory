import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromBooks from '../store';
import * as fromBooksAction from '../store/books.actions';

import { FirebaseService } from '../services/firebase.service';
import { IBook } from '../models/book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  @ViewChild("searchInput", {static: true})
  public searchInput: ElementRef;

  private _searchSubject: Subject<string>;
  public queryString: string;

  public books: IBook[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private store: Store<IBook>
  ) {
    this._searchSubject = new Subject<string>();
  }

  ngOnInit() {
    this.firebaseService.getBooks();
    this.store.select(fromBooks.selectAllBooks).subscribe(books => this.books =  books);
    this._searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(data => {
        this.store.dispatch(fromBooksAction.setSearchString({
          searchString: data
        }));
        this.store.select(fromBooks.getBooksForFiltering).subscribe(filteredBooks => this.books = filteredBooks);
      });
  } 

  filter(){
    this._searchSubject.next(this.queryString);
  }

}
