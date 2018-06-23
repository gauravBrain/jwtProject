"use strict";

var bcrypt = require('bcrypt');
var randomstring = require("randomstring");



function getNodeEnv() {
    return process.env.NODE_ENV;
}

function isValidEmail(email) {
    var pattern = /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/;
    return new RegExp(pattern).test(email);
}

var encryptHashPassword = function (password) {
    let salt = 10;
    return bcrypt.hashSync(password, salt);
}
var compareHashPassword = function(plainPass,hash){
   return bcrypt.compareSync(plainPass, hash); 
}


function isValidPhone(phone , verifyCountryCode ){
    var reExp = verifyCountryCode ? /^\+\d{6,16}$/ : /^\d{6,16}$/;
    return reExp.test(phone)
}


function createRedisValueObjectAdmin(obj) {
    let respObj = {};
    respObj._id = obj._id;
    respObj.email = obj.email;
    return respObj;
}

function buildAdminTokenGenObj(params) {
    var adminObj = {};
    adminObj.adminId = params._id;
    adminObj.email = params.email;
    return adminObj;
}


//========================== Export Module Start ===========================

module.exports = {
    getNodeEnv,
    isValidEmail,
    encryptHashPassword,
    compareHashPassword,
    isValidPhone,
    createRedisValueObjectAdmin,
    buildAdminTokenGenObj
};

//========================== Export Module End===========================
