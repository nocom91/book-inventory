import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as fromBooksAction from '../store/books.actions';
import * as fromBooks from '../store';

import { FirebaseService } from '../services/firebase.service';

import { Book, IBook, IBookBase } from '../models/book.model';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit, OnDestroy {

  private bookId: number;
  
  public selectedBook: Book;
  public isEditingMode: boolean;
  public isDataAvailable: boolean;
  public shippingList: string[];
  public filteredShippingList: Observable<string[]>;

  public bookForm: FormGroup;
  public shippingInput: FormControl;
  public availabilityInput: FormControl;

  private _bookSubscription: Subscription;
  private  _shippingOptionsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<IBook>,
    private firebaseService: FirebaseService
    ) { 
      this.selectedBook = new Book();
      this.isEditingMode = false;
      this.isDataAvailable = false;
      this.bookForm = new FormGroup({
        availabilityInput: new FormControl(0)
      });
      this.shippingInput = new FormControl('');
      this.bookForm.addControl('shippingInput', this.shippingInput);
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookId = +params['id'];
      this.store.dispatch(fromBooksAction.selectBook({bookId: this.bookId}));
      this.store.select(fromBooks.selectedBook)
      .subscribe(book => {
        if (book) {
          this.selectedBook = book;
          this.isDataAvailable = true;
          this.bookForm.setValue({
            availabilityInput: this.selectedBook.Availability,
            shippingInput: ''
          });
        }
      });
      this.store.select(fromBooks.getShippingOptions).subscribe(shippingOptions => this.shippingList = shippingOptions);      
    });
    this.filteredShippingList = this.shippingInput.valueChanges.pipe(
      startWith(''),
      map(opt => opt ? this._filterShippingOptions(opt): this.shippingList.slice())
    );
  }

  onSubmit() {
    let { availabilityInput, shippingInput } = this.bookForm.value;
    const data: IBookBase = {
      firebaseId: this.selectedBook.firebaseId,
      Availability: availabilityInput,
      Shipping: shippingInput
    };
    this.firebaseService.saveChanges(data).subscribe(response => {
      if (response) {
        this.store.dispatch(fromBooksAction.updateBook({
          book: {
            id: this.selectedBook.id,
            changes: {
              Availability: availabilityInput,
              Shipping: shippingInput
            }
          }
        }));
      }
    });
  }
  private _filterShippingOptions(filterString: string) {
    const filterValue = filterString.toLowerCase();

    return this.shippingList.filter(item => item.toLowerCase().indexOf(filterValue) > -1);
  }

  ngOnDestroy(){
    if (this._bookSubscription) {
      this._bookSubscription.unsubscribe();
    }
    if (this._shippingOptionsSubscription) {
      this._shippingOptionsSubscription.unsubscribe();
    }
  }

}
