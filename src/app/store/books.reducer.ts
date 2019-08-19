import {createReducer, on, Action} from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

import { setBooks, updateBook, selectBook, setSearchString} from './books.actions';
import { Book } from '../models/book.model';

export interface State extends EntityState<Book>{
    selectedBookId: number;
    searchString: string;
}

export function selectBookId(a: Book): string {
    return a.id.toString();
}

export function sortByTitle(a: Book, b: Book): number {
    return a.Title.localeCompare(b.Title);
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>({
    selectId: selectBookId,
    sortComparer: sortByTitle
});

export const initialState: State = adapter.getInitialState({
    selectedBookId: null,
    searchString: null
});

const bookReducer = createReducer(
    initialState,
    on(setBooks, (state, {books}) => adapter.addAll(books, state)),
    on(updateBook, (state, { book }) => adapter.updateOne(book, state)),
    on(selectBook, (state, { bookId }) => ({...state, selectedBookId: bookId})),
    on(setSearchString, (state, { searchString }) => ({...state, searchString: searchString}))
);

export function reducer(state: State | undefined, action: Action){
    return bookReducer(state, action);
}

export const getSelectedBookId = (state: State) => state.selectedBookId;

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();

export const selectBookIds = selectIds;

export const selectBookEntities = selectEntities;

export const selectAllBooks = selectAll;

export const selectBooktTotalCount = selectTotal;

export const selectSearchString = (state: State) => state.searchString;