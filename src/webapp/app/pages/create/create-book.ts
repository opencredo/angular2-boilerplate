/// <reference path="../../../../../typings/tsd.d.ts" />

// Angular 2
import {Component, View, Directive} from 'angular2/angular2';

// Simple component
@Component({
    selector: 'create-book'
})

@View({
    templateUrl: './app/pages/list/create-book.html'
})

export class CreateBook {
    constructor() {

    }
}
