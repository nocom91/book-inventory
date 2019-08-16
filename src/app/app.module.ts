import { environment } from '../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/books.reducer';

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
      FormsModule,
      StoreModule.forRoot({books: reducer}),
      StoreDevtoolsModule.instrument({maxAge: 15, logOnly: environment.production}),
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
