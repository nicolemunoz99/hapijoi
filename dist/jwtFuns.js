"use strict";
var jwt = require('jsonwebtoken');
var secret = require('my-secret');
var createToken = function (username) {
    var scopes;
    return jwt.sign({ username: username }, secret, { algorithm: 'HS256', expiresIn: "1h" });
};
module.exports = createToken;
