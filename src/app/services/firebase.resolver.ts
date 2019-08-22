import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IBook, Book } from '../models/book.model';
import { FirebaseService } from './firebase.service';
import { Store } from '@ngrx/store';
import * as fromBooksAction from '../store/books.actions';
import * as fromBooks from '../store';

@Injectable({
  providedIn: 'root'
})
export class FirebaseResolver implements Resolve<IBook[]> {

  constructor(private firebaseService: FirebaseService,
    private store: Store<IBook>) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let books: Book[] = [];
        this.store.select(fromBooks.selectAllBooks).subscribe(result => books = result);
        if (books.length === 0) {
            this.firebaseService.getBooks()          
            .subscribe(result => {
              let data = result.map((val, index) => {
                val.firebaseId = index;
                return val;
              });
              this.store.dispatch(fromBooksAction.setBooks(
                {
                    books: data
                }
            ))
          }
            );
        }
        return books;  
  }


}
