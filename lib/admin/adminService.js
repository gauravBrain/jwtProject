
"use strict";

const promise = require("bluebird");
var _ = require("lodash");
const adminDao = require('./adminDao');
const exception = require('../customException');
const appUtils = require('../appUtils');




function adminSignup(params) {
    return adminDao.adminSignup(params);
}

function adminLogin(params) {
    let plainPass = params.password;
    return adminDao.isAdminExist(params)
        .bind({})
        .then(function(isAdminRes){
            if(!isAdminRes){
               throw exception.adminNotExistException();
            }
            
            if(checkValidAdmin(plainPass,isAdminRes)){
                return isAdminRes;
            }else{
                throw exception.wrongCredentialsException();
            }

        })
    // return adminDao.adminLogin(params);    

}

function getAdminList(){
    return adminDao.getAdminList();
}


//custom functions 

function checkValidAdmin(plainPass,params){
    return appUtils.compareHashPassword(plainPass,params.password);
}


//Export modules
module.exports = {
    adminSignup,
    adminLogin,
    getAdminList
}
