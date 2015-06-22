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
  <nav class="navbar navbar-inverse navbar-static-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand">{{ title }}</a>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li>
                    <a router-link="list">List</a>
                </li>
                <li>
                    <a router-link="create">Create</a>
                </li>
            </ul>
        </div>
    </div>
  </nav>

  <main>
    <router-outlet></router-outlet>
  </main>
  `
})

@RouteConfig([
    { path: '/list',      as: 'list',      component: ListBooks },
    { path: '/create',    as: 'create',    component: CreateBook },
    { path: '/edit/:id',  as: 'edit',      component: EditBook },
    { path: '/view/:id',  as: 'view',      component: ViewBook }
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

