import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { BookInfoComponent } from './book-info/book-info.component';

const routes: Routes = [{
  path: '',
  component: BooksComponent,  
  },  
  {path:'books/:id', component: BookInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
