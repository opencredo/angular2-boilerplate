/// <reference path="../../../../../typings/tsd.d.ts" />

// Angular 2
import {Component, View, Directive} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';
import {Inject} from 'angular2/di';

import {BookService} from '../../services/BookService';
import {Book} from '../../models/Book';

@Component({
    selector: 'view-book'
})

@View({
    templateUrl: './app/pages/view/view-book.html'
})

export class ViewBook {
    book: Book = new Book();

    constructor(@Inject(RouteParams) params, public bookService:BookService) {
        this.getBook(params.get('id'));
    }

    getBook(id:string) {
        this.bookService.getBook(id)
            .map(res => res.json())
            .subscribe(res => this.book = Book.fromJSON(res));
    }
}
