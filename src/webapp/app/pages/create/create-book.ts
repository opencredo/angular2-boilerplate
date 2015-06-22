/// <reference path="../../../../../typings/tsd.d.ts" />

// Angular 2
import {Component, View, Directive, coreDirectives} from 'angular2/angular2';
import {formDirectives, FormBuilder, Control, ControlGroup, Validators} from 'angular2/forms';
import {Router} from 'angular2/router';

import {BookService} from '../../services/BookService';
import {Book} from '../../models/Book';

// Simple component
@Component({
    selector: 'create-book'
})

@View({
    templateUrl: './app/pages/create/create-book.html',
    directives: [coreDirectives, formDirectives]
})

export class CreateBook {
    createBookForm: ControlGroup;
    isbnInput: Control;
    titleInput: Control;
    authorInput: Control;
    publicationDateInput: Control;

    book: Book;

    canShowCreateFailedMsg: boolean;
    createFailedMsg: string;

    constructor(public router:Router, public bookService:BookService, public formBuilder: FormBuilder) {
        this.book = new Book();
        this.createFailedMsg = null;
        this.canShowCreateFailedMsg = false;

        this.createBookForm = formBuilder.group({
            'isbn': ['', Validators.required],
            'title': ['', Validators.required],
            'author': [''],
            'publicationDate': ['']
        });

        this.isbnInput = this.createBookForm.controls.isbn;
        this.titleInput = this.createBookForm.controls.title;
        this.authorInput = this.createBookForm.controls.author;
        this.publicationDateInput = this.createBookForm.controls.publicationDate;
    }

    createBook_successHandler(response) {
        if (response.status !== 201) {
            response.json().then(data => {
                this.canShowCreateFailedMsg = true;
                this.createFailedMsg = data.errorMessage || 'An error has occurred';
            });
        } else {
            this.listBooks();
        }
    }

    createBook_errorHandler(error) {
        this.createFailedMsg = error;
    }

    createBook() {
        this.canShowCreateFailedMsg = false;

        this.bookService.createBook(this.book.toJSON())
            .then(response => this.createBook_successHandler(response))
            .catch(error => this.createBook_errorHandler(error));
    }

    listBooks() {
        this.router.parent.navigate('/list');
    }
}
