
const adminService = require("../admin/adminService");
const redisClient = require("../redisClient/init");
const jwtHandler = require("../jwtHandler");
const appUtils = require("../appUtils");
const adminMapper = require("./adminMapper");

function adminSignup(params){
    params.password = appUtils.encryptHashPassword(params.password);
    return adminService.adminSignup(params);
}

function adminLogin(params){
    return adminService.adminLogin(params)
        .bind({})
        .then(function(response){
           var tokenObj =  appUtils.buildAdminTokenGenObj(response);
           return jwtHandler.genAdminToken(tokenObj)
           .then(function (jwt) {
               var redisObj = appUtils.createRedisValueObjectAdmin(response);
               redisClient.setValue(jwt, JSON.stringify(redisObj));
               return adminMapper.adminLoginResponse(response, jwt);
           })
        //    .then(function (respObj) {
        //        return respObj;
        //    })

        })
}


function getAdminList(){
    return adminService.getAdminList();
}

function logout(req){
    return jwtHandler.deleteToken(req)
        .then(function(result){
            return adminMapper.logoutResponse();
        })
}

module.exports = {
    adminSignup,
    adminLogin,
    getAdminList,
    logout
}