var express = require('express');
var Router = express.Router();

var AuthRoutes = require('./auth.router');
var BooksRoutes = require('./books.router');


Router.use('/auth', AuthRoutes);
Router.use('/books', BooksRoutes);


module.exports = Router;