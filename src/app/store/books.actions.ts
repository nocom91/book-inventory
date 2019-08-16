import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Book } from '../models/book.model';

export const setBooks = createAction('[Books] Set', props<{books: Book[]}>());
export const updateBook = createAction('[Books] Update', props<{book: Update<Book>}>() );
export const setSearchString = createAction('[SEARCH] Set search string', props<{searchString: string}>() );
export const selectBook = createAction('[Books] Select', props<{bookId: number}>()); 