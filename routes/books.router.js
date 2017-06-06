var express = require('express');
var Router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/authModel.js');
var Books = require('../models/booksModel.js');

Router.get('', (req, res) => {
    Books.find({})
        .then((books) => {
            res.json(books);
        })
        .catch(() => {
            sentErrorMessage(res, "Have a Wrong.");
        })
})

Router.get('/mybooks', isAuthenticated, (req, res) => {
    console.log(req.user);
    Books.find({ owner: req.user._id })
        .then((books) => {
            res.json(books);
        })
        .catch(() => {
            sentErrorMessage(res, "Have a Wrong.");
        })
})

Router.post('/new', isAuthenticated, (req, res) => {
    var { name, image, author, description, language, pages, url } = req.body;
    User.findById(req.user._id)
        .then((user) => {
            Books.create({ owner: req.user._id, name, image, author, description, language, pages, url })
                .then((book) => {
                    user.books.push(book._id);
                    user.save()
                        .then(() => {
                            res.json(book);
                        })
                })
                .catch(() => {
                    sentErrorMessage(res, "Create New Book Error. Please try again.")
                })
        })
});


Router.route('/:id')
    .get((req, res) => {
        Books.findById(req.params.id).populate('owner').exec()
            .then((book) => {               
                res.json({
                    _id: book._id,
                    owner_id: book.owner._id,
                    created_by: book.owner.username,
                    name: book.name,
                    image: book.image,
                    author: book.author,
                    language: book.language,
                    pages: book.pages,
                    url: book.url,
                    description: book.description,
                    date: book.date
                });
            })
            .catch(() => {
                sentErrorMessage(res, 'The Book is invalid. Try another Book.')
            })
    })
    .delete(isAuthenticated, (req, res) => {        
        Books.findByIdAndRemove(req.params.id)
            .then((book) => {
                User.findOneAndUpdate(req.user._id, {
                    $pull: { books: book._id }
                });
                res.json({ success: true, message: "Delete Item Success" })
            })
            .catch(() => {
                sentErrorMessage(res, "Delete Item Not Success");
            })
    })


function sentErrorMessage(res, message) {
    res.json({ success: false, message });
}

function isAuthenticated(req, res, next) {
    if (!req.header('Authorization')) {
        return;
    }
    var token = req.header('Authorization').split(" ")[1];
    var payload = jwt.decode(token, 'phupro');
    if (!payload) {
        return;
    }
    req.user = payload;
    next();
}



module.exports = Router;