// load all dependencies
var Promise = require("bluebird");
var jwt = Promise.promisifyAll(require("jsonwebtoken"));
var exceptions = require('./customException')
var appConstants = require('./constants');
var redisClient = require("./redisClient/init");
var TOKEN_EXPIRATION_SEC = appConstants.TOKEN_EXPIRATION_TIME * 60;

var JWT_ALGORITHM = 'RS256';
var JWT_SECRET_KEY = "login_secret_key_to_save_data";

var genAdminToken = function (admin, setExpire) {
    var options = {};
    return jwt.signAsync(admin, JWT_SECRET_KEY, options)
        .then(function (jwtToken) {
            return jwtToken;
        })
        .catch(function (err) {
            throw new exceptions.tokenGenException()
        })
}



var verifyAdminToken = function (acsTokn,res) {
    return jwt.verifyAsync(acsTokn, JWT_SECRET_KEY)
        .bind({})
        .then(function (tokenPayload) {
            this.tokenPayload = tokenPayload;
            return redisClient.getValue(acsTokn);
        })
        .then(function(reply) {
            if(reply) {return this.tokenPayload;}
            else { throw err; }
        })
        .catch(function (err) {
            let Error = {name : err.name,message : err.message}
            throw new exceptions.unauthorizeAccess(Error)
        })
}


var expireToken = function (req) {
    var token = req.get('accessToken');
    console.log(token);
    if (token) {
        //blacklist token in redis db
        //it will be removed after 6 months
        redisClient.setValue(token, true);
        redisClient.expire(token, TOKEN_EXPIRATION_SEC);
    }
    console.log("fine");
}

var deleteToken = function(req){
    let token = req.get('accessToken');
    if (token) {       
       return redisClient.delValue(token, true);
    }
}

module.exports = {
    genAdminToken,
    verifyAdminToken,
    expireToken,
    deleteToken 
}
