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
   MatButtonModule,
   MatIconModule,
   MatTooltipModule,
   MatAutocompleteModule,
   MatProgressSpinnerModule,
   MatSnackBarModule,
   MatCardModule
} from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FirebaseService } from './services/firebase.service';
import { FirebaseResolver } from './services/firebase.resolver';

import { PluralPipe } from './pipes/plural.pipe';

import { BooksComponent } from './books/books.component';
import { BookInfoComponent } from './book-info/book-info.component';

@NgModule({
   declarations: [
      AppComponent,
      BooksComponent,
      BookInfoComponent,
      PluralPipe
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
      ScrollingModule,
      MatButtonModule,
      MatIconModule,
      MatTooltipModule,
      MatAutocompleteModule,
      MatProgressSpinnerModule,
      MatSnackBarModule,
      MatCardModule,
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
