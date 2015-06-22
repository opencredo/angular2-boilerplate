// Ref: http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4
var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    books = require('./mock/api/books'),
    app = express(),
    port = 7777,
    router = express.Router(),
    webAppDir = createSystemFileName('../../public/'),
    apiRouterPrefix = '/api',

    ERROR_BOOK_ALREADY_EXISTS = {
        errorCode: 'BOOK_ALREADY_EXISTS',
        errorMessage: 'Book with isbn already exists'
    };

// given a file name path relative to this directory, create an absolute path
function createSystemFileName(fileName) {
    return path.resolve(path.join(__dirname, fileName));
}

function getBooks() {
    return books;
}

function getBookById(id) {
    return books.filter(function (book) {
        return book.isbn === id;
    })[0];
}

function updateBook(id, book) {
    var _book = getBookById(id),
        key;

    for (key in _book) {
        if (_book.hasOwnProperty(key) && book.hasOwnProperty(key)) {
            _book[key] = book[key];
        }
    }

    return _book;
}

function deleteBook(id) {
    var i;

    for (i = 0; i < books.length; i += 1) {
        if (books[i].isbn === id) {
            books.splice(i, 1);
            break;
        }
    }
}

function createBook(book) {
    var _book = getBookById(book.isbn);

    if (typeof _book === 'undefined') {
        books.push(book);
    } else {
        throw new Error('Book with this id already exists');
    }
}

// only log requests to the API:
router.use(morgan('dev'));

router.get('/books',
    function (req, res) {
        res.status(200).json(getBooks());
    }
).get('/books/:id',
    function (req, res) {
        var id = req.params.id;

        res.status(200).json(getBookById(id));
    }
).put('/books/:id',
    function (req, res) {
        var id = req.params.id,
            book = req.body;

        res.status(200).json(updateBook(id, book));
    }
).post('/books',
    function (req, res) {
        var book = req.body;

        try {
            createBook(book);
            res.status(201).json();
        } catch (error) {
            res.status(409).json(ERROR_BOOK_ALREADY_EXISTS);
        }
    }
).delete('/books/:id',
    function (req, res) {
        var id = req.params.id;

        res.status(200).json(deleteBook(id));
    }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// currently, we are fixed to the dev distribution:
app.use(express.static(webAppDir));
// configure router to handle specific prefix in the path
app.use(apiRouterPrefix, router);
app.listen(port);

console.log('Web app dir:', webAppDir);
console.log('Logging only service API calls');
console.log('Open browser at: http://127.0.0.1:' + port + '/');
