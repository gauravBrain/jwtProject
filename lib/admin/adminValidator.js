/**
 * Created by Gaurav on 2/06/2018.
 */

var _ = require("lodash");
var appUtils = require("../appUtils");
var appConst = require("../constants");
var adminConst = require('./adminConstant');
var exceptions = require("../customException");


function validationError(errors,res) {
    if (errors && errors.length > 0) {
        res.send(exceptions.getCustomErrorException(appConst.MESSAGES.validationError, errors))
    }
}


var adminSignup = function (req, res, next) {

    let {email, password, name, age} = req.body;
    let {platform} = req.headers;
    let errors = [];

    email = _.toLower(email);
    if (_.isEmpty(email)) {
        errors.push({fieldName: "email", message: appConst.MESSAGES.invalidEmail});
    }
    if (!appUtils.isValidEmail(email)) {
        errors.push({fieldName: "email", message: appConst.MESSAGES.invalidEmail});
    }
    if (_.isEmpty(password)) {
        errors.push({fieldName: "password", message: appConst.MESSAGES.passCantEmpty});
    }
    
    if (_.isEmpty(platform)) {
        errors.push({fieldName: "platform", message: appConst.MESSAGES.platformCantEmpty});
    }
    if (errors && errors.length > 0) {
        validationError(errors,res);
        return;
    }
    next();
};

var adminLogin = function(req,res,next) {
    let {email, password} = req.body;
    let {platform} = req.headers;
    let errors = [];

    email = _.toLower(email);
    if (_.isEmpty(email)) {
        errors.push({fieldName: "email", message: appConst.MESSAGES.invalidEmail});
    }
    if (!appUtils.isValidEmail(email)) {
        errors.push({fieldName: "email", message: appConst.MESSAGES.invalidEmail});
    }
    if (_.isEmpty(password)) {
        errors.push({fieldName: "password", message: appConst.MESSAGES.passCantEmpty});
    }
    
    if (_.isEmpty(platform)) {
        errors.push({fieldName: "platform", message: appConst.MESSAGES.platformCantEmpty});
    }

    if (errors && errors.length > 0) {
        validationError(errors,res);
        return;
    }
    next();
}


module.exports = {
    adminSignup,
    adminLogin
}