import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromBooks from '../store';
import * as fromBooksAction from '../store/books.actions';

import { Book } from '../models/book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {

  @ViewChild("searchInput", {static: true})
  public searchInput: ElementRef;

  private _searchSubject: Subject<string>;
  public queryString: string;

  public books: Book[] = [];

  private _filterSubscription: Subscription;
  private _filterStringSubscription: Subscription;

  constructor(
    private store: Store<Book>
  ) {
    this._searchSubject = new Subject<string>();
  }

  ngOnInit() {
    this._filterSubscription = this._searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(data => {
        this.store.dispatch(fromBooksAction.setSearchString({
          searchString: data
        }));
        this.store.select(fromBooks.getBooksForFiltering).subscribe(filteredBooks => this.books = filteredBooks);
      });

    this._filterStringSubscription = this.store.select(fromBooks.selectSearchString).subscribe(seachString => {
      if (seachString) {
        this.queryString = seachString;
        this._searchSubject.next(seachString);
      }
    });
  }

  filter() {
    this._searchSubject.next(this.queryString);
  }

  ngOnDestroy(){
    if (this._filterStringSubscription)
      this._filterStringSubscription.unsubscribe();
    if (this._filterSubscription)
      this._filterSubscription.unsubscribe();
  }
}
