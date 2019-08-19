import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Book, IBook, IBookBase } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private host: string = 'https://book-inventory-acd5e.firebaseio.com';
  constructor(private http: HttpClient, private store: Store<IBook>) {  }

  getBooks() {
   return this.http.get<Book[]>(`${this.host}/books.json`);
  }

  saveChanges(changes: IBookBase){
    return this.http.patch(`${this.host}/books/${changes.firebaseId}.json`, changes);
  }

}
