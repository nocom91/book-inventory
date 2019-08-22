import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromBooks from '../store';
import * as fromBooksAction from '../store/books.actions';

import { Book } from '../models/book.model';
import { FormControl } from '@angular/forms';
import { filterBookArray } from '../web-worker/filter';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {
  public searchStringControl: FormControl;

  public books$: Observable<Book[]>;
  public searchString$: Observable<string>;
  private _filterSubscription: Subscription;
  private _filterStringSubscription: Subscription;
  private _allBooksSubscription: Subscription;

  private _filterWebWorker: Worker;
  constructor(
    private store: Store<Book>
  ) {
    this.searchStringControl = new FormControl();
    this.books$ = new Observable<Book[]>();
    this.searchString$ = new Observable<string>();
  }

  ngOnInit() {
    this.books$ = this.store.select(fromBooks.selectAllBooks);
    this._filterStringSubscription = this.store.select(fromBooks.selectSearchString)
      .subscribe(str => {
        if (!this.searchStringControl.value) {
          this.searchStringControl.setValue(str);
          //this.startWebWorker(str);
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
        //this.startWebWorker(data);
      });
  }


  // startWebWorker(searchInput: string) {
  //   this._allBooksSubscription = this.store.select(fromBooks.selectAllBooks)
  //     .subscribe(books => {
  //       const data = {
  //         books: books,
  //         searchString: searchInput
  //       }
  //       if (typeof Worker !== 'undefined') {
  //         if (!this._filterWebWorker) {
  //           this._filterWebWorker = new Worker('../web-worker/filter-worker.worker', { type: 'module' });
  //         }
  //         this._filterWebWorker.onmessage = ({ data }) => {
  //           this.books$ = of(data);
  //         };

  //         this._filterWebWorker.postMessage(data);
  //       } else {
  //         filterBookArray(data);
  //       }
  //     });
  // }

  ngOnDestroy() {
    if (this._filterSubscription)
      this._filterSubscription.unsubscribe();
    if (this._filterStringSubscription)
      this._filterStringSubscription.unsubscribe();
    if (this._allBooksSubscription)
      this._allBooksSubscription.unsubscribe();
  }
}
