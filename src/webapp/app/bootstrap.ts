/// <reference path="../../../typings/tsd.d.ts" />

// Angular 2
import {bootstrap} from 'angular2/angular2';

// Angular's router injectables services/bindings
import {routerInjectables} from 'angular2/router';

// Angular's form injectables services/bindings
import {formInjectables} from './common/formInjectables';

import {appServicesInjectables} from './services/services';

import {App} from './pages/pages';

bootstrap(
    App,
    [
        formInjectables,
        appServicesInjectables,
        routerInjectables
    ]
);

