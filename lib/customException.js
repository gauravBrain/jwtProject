
var Exception = require("./model/Exception");
var constants = require("./constants");
var adminConstant = require("./admin/adminConstant");

module.exports = {

    intrnlSrvrErr: function (err) {
        return new Exception(1, constants.MESSAGES.intrnlSrvrErr, err);
    },
    unauthorizeAccess: function (err) {
        return new Exception(2, constants.MESSAGES.unAuthAccess, err)
    },
    tokenGenException: function (err) {
        return new Exception(3, constants.MESSAGES.tokenGenError, err)
    },
    invalidEmail: function () {
        return new Exception(4, constants.MESSAGES.invalidEmail)
    },
    invalidMobileNo: function () {
        return new Exception(4, constants.MESSAGES.invalidMobile)
    },
    invalidOTP: function () {
        return new Exception(4, constants.MESSAGES.invalidOtp)
    },
    getCustomErrorException: function (errMsg, error) {
        return new Exception(5, errMsg, error);
    },


    //Admin Exceptions 
    adminNotExistException: function () {
        let errMsg = adminConstant.MESSAGES.ADMIN_NOT_EXISTS;
        return new Exception(1, errMsg);
    },

    wrongCredentialsException : function () {
        let errMsg = adminConstant.MESSAGES.WRONG_CREDENTIALS;
        return new Exception(1, errMsg);
    },
};
