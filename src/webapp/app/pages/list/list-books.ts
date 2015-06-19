
/// <reference path="../../../../../typings/tsd.d.ts" />

// Angular 2
import {Component, View, Directive, coreDirectives} from 'angular2/angular2';
import {Router} from 'angular2/router';

@Component({
    selector: 'list-books'
})

@View({
    directives: [coreDirectives],
    templateUrl: './app/pages/list/list-books.html'
})

export class ListBooks {
    books: Array<any>;
    constructor(public router:Router) {
        this.books = [
            {
                isbn: '1234',
                title: 'Title',
                author: 'John Doe',
                publicationDate: new Date()

            },
            {
                isbn: '12345',
                title: 'Title X',
                author: 'Jane Doe',
                publicationDate: new Date()
            }
        ]
    }

    viewBook(book) {
        this.router.navigate('/view/' + book.isbn);
    }

    addNewBook() {
        this.router.navigate('/create');
    }
}
