import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
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
  private _books: Book[];
  private _filterSubscription: Subscription;
  private _filterStringSubscription: Subscription;

  private _filterWebWorker: Worker;
  constructor(
    private store: Store<Book>
  ) {
    this.searchStringControl = new FormControl();
    this.books$ = new Observable<Book[]>();
  }

  ngOnInit() {
    this.store.select(fromBooks.selectAllBooks).subscribe(b => this._books = b);
    this._filterStringSubscription = this.store.select(fromBooks.selectSearchString)
      .subscribe(str => {
        if (!this.searchStringControl.value) {
          this.searchStringControl.setValue(str);
          this.startWebWorker(str);
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
        this.startWebWorker(data);
      });
  }

  ngOnDestroy() {
    if (this._filterSubscription)
      this._filterSubscription.unsubscribe();
    if (this._filterStringSubscription)
      this._filterStringSubscription.unsubscribe();
  }  

  startWebWorker(searchInput: string) {
    if (typeof Worker !== 'undefined') {
      if (!this._filterWebWorker) {
        this._filterWebWorker = new Worker('../web-worker/filter-worker.worker', { type: 'module' });
      }
      this._filterWebWorker.onmessage = ({ data }) => {
        this.books$ = of(data);
      };
      const data = {
        books: this._books, 
        searchString : searchInput
      }
      this._filterWebWorker.postMessage(data);
    }
  }
}
