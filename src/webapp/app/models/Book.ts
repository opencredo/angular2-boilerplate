export class Book {
    constructor(
        public isbn:string = null,
        public title:string = null,
        public author:string = null,
        public publicationDate:string = null) {
    }

    static fromJSON(json:any) {
        if (json) {
            var isbn:string = json.isbn || null;
            var title:string = json.title || null;
            var author:string = json.author || null;
            var publicationDate:string = json.publicationDate || null;
            return new Book(isbn, title, author, publicationDate);
        } else {
            return new Book(null, null, null, null);
        }
    }

    toJSON() {
        var json = {
            isbn: this.isbn,
            title: this.title,
            author: this.author,
            publicationDate: this.publicationDate
        };

        return json;
    }
}
