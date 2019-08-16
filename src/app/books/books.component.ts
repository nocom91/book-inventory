import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  public books: Book[] = [];
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getBooks().subscribe(response => this.books = response);
  } 

}
