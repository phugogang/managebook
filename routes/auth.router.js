var express = require('express');
var Router = express.Router();
var jwt = require('jsonwebtoken');

var authModel = require('../models/authModel');


Router.post('/register', (req, res) => {
    var auth = new authModel();
    auth.username = req.body.username;
    auth.password = req.body.password;
    auth.email = req.body.email || "";

    auth.save()
        .then((user) => {
            sendToken(user, res)
        })
        .catch((err) => {
            sendAuthError(res)
        })

})


Router.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    authModel.findOne({ username })
        .then((user) => {
            var isMatch = user.comparePassword(password, user.password);
            if (isMatch) {
                console.log(user);
                sendToken(user, res)
            } else {
                sendAuthError(res)
            }
        })
        .catch((err) => {
            sendAuthError(res)
        })
})



Router.route('/profile')
    .all(isAuthenticated)
    .get((req, res) => {
        authModel.findById(req.user._id)
                .then((user) => {
                    res.json(user)
                })
                .catch(() => {
                    sendErrorMessage(res, 'User not Found.')
                })
    })
    .put((req, res) => {      

        authModel.findOneAndUpdate({_id: req.user._id}, req.body)
            .then(() => {
          
                sendSuccessMessage(res, "Update Profile Success.")
            })
            .catch((err) => {
                console.log(err);
                sendErrorMessage(res, "Username or Password incorrect")
            })
    });





function sendToken(user, res) {
    var token = jwt.sign({ _id: user._id }, 'phupro');
    res.json({ success: true, username: user.username, token })
}

function sendSuccessMessage(res, message) {
    res.json({ success: true, message })
}

function sendErrorMessage(res, message) {
    res.json({ success: false, message})
}

function sendAuthError(res) {
    res.json({success: false, message: "UnAuthorization. try again."});
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