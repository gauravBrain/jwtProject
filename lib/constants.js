const STATUS_CODE = {
    ERROR: 0,
    SUCCESS: 1
}

const DB_MODEL_REF = {
    ADMIN : "Admin",
}


const MESSAGES = {
    intrnlSrvrErr: "Please try after some time.",
    unAuthAccess: "Unauthorized access ",
    tokenGenError: "Error while generating access token",
    invalidEmail: "Please fill valid Email Address",
    invalidMobile: "Please fill valid Mobile No",
    invalidOtp: "Invalid OTP",
    platformCantEmpty : "Platform cannot be empty or invalid",
    passCantEmpty: "Password can't be empty",
    validationError : "Validation errors"
}


module.exports = Object.freeze({
    STATUS_CODE : STATUS_CODE,
    DB_MODEL_REF : DB_MODEL_REF,
    MESSAGES: MESSAGES,
    TOKEN_EXPIRATION_TIME : 60 * 24 * 60, // 60 days

});