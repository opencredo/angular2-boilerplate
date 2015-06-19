/// <reference path="../../../../../typings/tsd.d.ts" />

// Angular 2
import {Component, View, Directive} from 'angular2/angular2';

// Simple component
@Component({
    selector: 'edit-book'
})

@View({
    templateUrl: './app/pages/list/edit-book.html'
})

export class EditBook {
    constructor() {

    }
}
