import { Book } from "../models/book.model";

export function filterBookArray(data: any): Book[] {
    let { books, searchString } = data;
    const resultBooks: Book[] = [];
    if (searchString) {
        const lowSearchString = searchString.toLowerCase();
        for (const value of books) {
            const temp_book = value;
            for (const property in value) {
                if (property === 'id') continue;
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
        }
    }
    return resultBooks;
}