"use strict";

//========================== Load Modules Start ===========================
var Promise = require("bluebird");
//========================== Load internal Module =========================
var exceptions = require("../customException.js");
var jwtHandler = require("../jwtHandler");
const resHndlr = require('../responseHandler');
var constants = require("../constants");

//========================== Load Modules End =============================

var __verifyTok = function (acsTokn,res) {
    return jwtHandler.verifyAdminToken(acsTokn,res)
        .then(function (tokenPayload) {
            return tokenPayload;
        })
        .catch(function (err) {
            throw err

        })
};

var expireToken = function(req, res, next) {

    return jwtHandler.expireToken(req)
    .then(function(result) {
        return result;
        next();
    })
    .catch(function (err) {
            next(err)
        })
}


var autntctTkn = function (req, res, next) {
    var acsToken = req.get('accessToken');
     __verifyTok(acsToken,res)
        .bind({})
        .then(function (tokenPayload) {
            return tokenPayload;
        })
        .then(function (paylod) {
            req.admin = paylod;
            next()
        })
        .catch(function (err) {
            resHndlr.sendError(res, err);
        })
}



//========================== Export Module Start ===========================

module.exports = {
    autntctTkn,
    expireToken
};

//========================== Export Module End ===========================
