import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule, MatDividerModule, MatListModule, MatButtonModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FirebaseService } from './services/firebase.service';

import { BooksComponent } from './books/books.component';
import { BookInfoComponent } from './book-info/book-info.component';

@NgModule({
   declarations: [
      AppComponent,
      BooksComponent,
      BookInfoComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      MatInputModule,
      MatDividerModule,
      MatListModule,
      MatButtonModule,
      MatIconModule,
      MatTooltipModule,
      BrowserAnimationsModule
   ],
   providers: [
      FirebaseService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
