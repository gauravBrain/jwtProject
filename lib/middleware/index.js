"use strict";

var authenticate = require("./auth.js");
var multer = require("./multer.js");


// Exports module
module.exports = {
    authenticate : authenticate,
    multer : multer
}