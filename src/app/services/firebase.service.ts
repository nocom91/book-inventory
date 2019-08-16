import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private host: string = 'https://book-inventory-acd5e.firebaseio.com/books.json';
  constructor(private http: HttpClient) {  }

  getBooks(){
    return this.http.get<Book[]>(this.host);
  }

}
