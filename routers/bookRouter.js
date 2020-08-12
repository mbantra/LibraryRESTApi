const express = require('express');

function routes(Book, bookService) {
    const bookRouter = express.Router();

    bookRouter.route('/')
    .get((req, res) => {
        Book.find((err, books) => {
            if(err) {
                return res.send(err);
            }
            return res.json(books);
        });
    })
    .post((req, res) => {
        const book = new Book(req.body);
        book.save((err) => {
            if(err) {
                return res.send(err);
            }
            return res.status(201).json(book);
        })
    });

    bookRouter.route('/details/:id')
    .get((req, res) => {
        const { id } = req.params;
        let response = {};
        (async function goodReadsCall(){
            response = await bookService.getBookDetailsById(id);
            if(response.status == 401) {
                return res.send('UnAuthenticated!');
            }
            return res.json(response);
        })();
    });

    bookRouter.use('/:bookId', (req, res, next) => {
        Book.findById(req.params.bookId, (err, book) => {
            if(err) {
                return res.send(err);
            }
            if(book) {
                req.book = book;
                return next();
            }
            return res.sendStatus(404);
        })
    })
    bookRouter.route('/:bookId')
    .get((req, res) => res.json(req.book))
    .put((req, res) => {
        const { book } = req;
            book.title = req.body.title;
            book.author = req.body.author;
            book.genre = req.body.genre;
            book.read = req.body.read;
            book.save((err) => {
                return res.json(book);
            });
    })
    .patch((req, res) => {
        const { book } = req;
        Object.entries(req.body).forEach((item) => {
            const key = item[0];
            const value = item[1];
            book[key] = value;
        });
        book.update((err) => {
            if(err) {
                return res.send(err);
            }
            return res.json(book);
        })
    })
    .delete((req, res) => {
        req.book.remove((err) => {
            if(err) {
                return res.send(err);
            }
            return res.sendStatus(204);
        })
    });



    return bookRouter;
}

module.exports = routes;