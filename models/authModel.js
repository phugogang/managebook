var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: String,
    password: {
        type: String,
        bcrypt: true,
        required: true
    },
    city: String,
    state: String,
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'books'
    }],
    book_trade: [{
        type: Schema.Types.ObjectId,
        ref: 'books'
    }],
    

})

userSchema.methods.comparePassword = function (password, hash) {
    return bcrypt.compareSync(password, hash);
}

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    if (this.password) {
        var salt = bcrypt.genSaltSync(15);
        var hash = bcrypt.hashSync(this.password, salt);
        this.password = hash;
        next();
    }
})



module.exports = mongoose.model('user', userSchema);