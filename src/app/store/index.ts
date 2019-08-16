import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromBook from './books.reducer';

export interface State {
    books: fromBook.State;
}

export const reducers: ActionReducerMap<State> = {
    books: fromBook.reducer
};

export const selectBookState = createFeatureSelector<fromBook.State>('books');

export const selectBookEntities = createSelector(
    selectBookState,
    fromBook.selectBookEntities
);

export const selectAllBooks = createSelector(
selectBookState,
fromBook.selectAllBooks
);

export const selectSearchString = createSelector(selectBookState, fromBook.selectSearchString);

export const getBooksForFiltering = createSelector(selectAllBooks, selectSearchString, (books, searchString) =>
    books.filter((value) => value.Title.toLowerCase().indexOf(searchString) > -1 ||
                            value.Publisher.toLowerCase().indexOf(searchString) > -1 || 
                            value.Price.toString().indexOf(searchString) > -1 ||
                            value.Availability.toString().indexOf(searchString) > -1 ||
                            value.Authors.some(author => author.toLowerCase().indexOf(searchString) > -1)
                            )
);