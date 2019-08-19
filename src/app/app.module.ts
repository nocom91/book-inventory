import { environment } from '../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/books.reducer';

import { 
   MatInputModule,
   MatDividerModule,
   MatListModule,
   MatButtonModule,
   MatIconModule,
   MatTooltipModule,
   MatAutocompleteModule,
   MatProgressSpinnerModule,
   MatSnackBarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FirebaseService } from './services/firebase.service';
import { FirebaseResolver } from './services/firebase.resolver';

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
      ReactiveFormsModule,
      StoreModule.forRoot({books: reducer}),
      StoreDevtoolsModule.instrument({maxAge: 15, logOnly: environment.production}),
      MatInputModule,
      MatDividerModule,
      MatListModule,
      MatButtonModule,
      MatIconModule,
      MatTooltipModule,
      MatAutocompleteModule,
      MatProgressSpinnerModule,
      MatSnackBarModule,
      BrowserAnimationsModule
   ],
   providers: [
      FirebaseService,
      FirebaseResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
