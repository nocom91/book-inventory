import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromBooks from '../store';
import * as fromBooksAction from '../store/books.actions';

import { Book } from '../models/book.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {

  @ViewChild("searchInput", { static: true })
  public searchInput: ElementRef;

  public searchStringControl: FormControl;

  public books$: Observable<Book[]>;
  private _filterSubscription: Subscription;
  private _filterStringSubscription: Subscription;

  constructor(
    private store: Store<Book>
  ) {
    this.searchStringControl = new FormControl();
    this.books$ = this.store.select(fromBooks.getFilteredBooks);
  }

  ngOnInit() {
    this._filterStringSubscription = this.store.select(fromBooks.selectSearchString)
      .subscribe(str => {
        if (!this.searchStringControl.value) {
          this.searchStringControl.setValue(str);
        }
      });
    this._filterSubscription = this.searchStringControl
      .valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(data => {
        this.store.dispatch(fromBooksAction.setSearchString({
          searchString: data
        }));
      });
  }

  ngOnDestroy() {
    if (this._filterSubscription)
      this._filterSubscription.unsubscribe();
    if (this._filterStringSubscription)
      this._filterStringSubscription.unsubscribe();

  }  
}
