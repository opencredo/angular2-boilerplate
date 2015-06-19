/// <reference path="../../../../typings/tsd.d.ts" />

// Angular 2
import {Component, View, coreDirectives} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, Router} from 'angular2/router';
import {BrowserLocation} from 'angular2/src/router/browser_location';

import {CreateBook} from './create/create-book';
import {EditBook} from './edit/edit-book';
import {ListBooks} from './list/list-books';
import {ViewBook} from './view/view-book';

@Component({
    selector: 'app',
})

@View({
    directives: [ RouterOutlet, RouterLink, coreDirectives ],
    template: `
  <h1 class="title">{{ title }}</h1>

  <main>
    <router-outlet></router-outlet>
  </main>
  `
})

@RouteConfig([
    { path: '/',          as: 'list',      component: ListBooks },
    { path: '/create',    as: 'create',    component: CreateBook },
    { path: '/edit/:id',  as: 'edit',      component: EditBook },
    { path: '/view/:id',  as: 'view',      component: View }
])

export class App {
    title: string;
    constructor(router: Router, browserLocation: BrowserLocation) {
        this.title = 'Angular 2 CRUD Application';

        // we need to manually go to the correct uri until the router is fixed
        let uri = browserLocation.path();
        router.navigate(uri);
    }
}

