
/// <reference path="../../../../../typings/tsd.d.ts" />

// Angular 2
import {Component, View, Directive, coreDirectives} from 'angular2/angular2';
import {Router} from 'angular2/router';

import {BookService} from '../../services/BookService';

@Component({
    selector: 'list-books'
})

@View({
    directives: [coreDirectives],
    templateUrl: './app/pages/list/list-books.html'
})

export class ListBooks {
    books: Array<any>;

    constructor(public router:Router, public bookService:BookService) {
        this.getBooks();
    }

    getBooks() {
        this.bookService.getBooks()
            .map(res => res.json())
            .subscribe(res => this.books = res);
    }

    viewBook(book) {
        this.router.parent.navigate('/view/' + book.isbn);
    }

    editBook(book) {
        this.router.parent.navigate('/edit/' + book.isbn);
    }

    deleteBook(book) {
        this.bookService.deleteBook(book.isbn)
            .subscribe(res => this.getBooks());
    }
}
