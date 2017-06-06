var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;


var BooksSchems = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    name: String,
    image: String,
    language: String,
    pages: Number,
    author: String,
    description: String,
    url: String,
    date: {
        type: Date,
        default: Date.now()
    }
    
})



module.exports = mongoose.model('books', BooksSchems);