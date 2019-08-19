import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { BookInfoComponent } from './book-info/book-info.component';
import { FirebaseResolver } from './services/firebase.resolver';

const routes: Routes = [{
  path: '',
  component: BooksComponent,
  resolve: {
    books: FirebaseResolver
  }
},
{
  path: 'books/:id',
  component: BookInfoComponent,
  resolve: {
    books: FirebaseResolver
  }
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
