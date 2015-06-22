/// <reference path="../../../../typings/tsd.d.ts" />

import {Inject} from 'angular2/di';
import {Http, BaseRequestOptions, Headers, httpInjectables} from 'angular2/http';

export class BookService {
    http: Http;
    baseURL: string;
    baseRequestOptions: BaseRequestOptions;

    constructor(@Inject(Http) http, @Inject(BaseRequestOptions) baseRequestOptions) {
        this.http = http;
        this.baseURL = '/api/books';
        this.baseRequestOptions = baseRequestOptions;
    }

    _callAPI(url:string, method:string, data:any) {
        return window.fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    getBooks() {
        return this.http.get(this.baseURL);
    }

    getBook(id:string) {
        return this.http.get(this.baseURL + '/' + id);
    }

    updateBook(id:string, data:any) {
        return this._callAPI(this.baseURL + '/' + id, 'PUT', data);

        /*var headers = new Headers();
        headers.set('Content-Type', 'application/json');
        return this.http.put(
            this.baseURL + '/' + id,
            JSON.stringify(data),
            this.baseRequestOptions.merge({
                headers: headers
            })
        );*/
    }

    createBook(data:any) {
        return this._callAPI(this.baseURL, 'POST', data);

        /*var headers = new Headers();
         headers.set('Content-Type', 'application/json');
         return this.http.post(
            this.baseURL + '/' + id,
            JSON.stringify(data),
            this.baseRequestOptions.merge({
                headers: headers
            })
         );*/
    }

    deleteBook(id:string) {
        return this.http.delete(this.baseURL + '/' + id);
    }
}

export let bookServiceInjectables = [
    BookService,
    httpInjectables
];
