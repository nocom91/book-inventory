import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromBook from './books.reducer';
import { Book } from '../models/book.model';

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

export const selectedBook = createSelector(
    selectBookEntities,
    selectBookState,
    (books, state) => {
        return books[state.selectedBookId];
    }
);

export const selectSearchString = createSelector(selectBookState, fromBook.selectSearchString);

export const getBooksForFiltering = createSelector(selectAllBooks, selectSearchString, (books, searchString) => {
    const resultBooks: Book[] = [];
    const lowSearchString = searchString.toLowerCase();
    if (!lowSearchString)
        return resultBooks;
    books.forEach(value => {
        const temp_book = value;
        for (const property in value) {
            if (value.hasOwnProperty(property)) {
                const element = value[property];
                if (!(element instanceof Array) && element.toString().toLowerCase().indexOf(lowSearchString) > -1) {
                    temp_book.FieldToShow = property;
                    temp_book.ValueToShow = element;
                    resultBooks.push(temp_book);
                    break;
                } else if (element instanceof Array) {
                    if (element.some(author => author.toLowerCase().indexOf(lowSearchString) > -1)) {
                        temp_book.FieldToShow = property;
                        temp_book.ValueToShow = element.join(', ');
                        resultBooks.push(temp_book);
                        break;
                    }
                }
            }
        }
    });
    return resultBooks;
});

export const getShippingOptions = createSelector(selectAllBooks, (books) => {
    return books.map(book => book.Shipping).filter(onlyUnique);
});


function onlyUnique(value, index, self) {
    return value && self.indexOf(value) === index;
}