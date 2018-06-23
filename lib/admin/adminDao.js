const Admin = require('./adminModel');
let BaseDao = require('../dao/baseDao');
const adminDao = new BaseDao(Admin);


function adminSignup(params){
    let admin = new Admin(params);
    return adminDao.save(admin);
}

function isAdminExist(params){
    let query = {'email' : params.email };
    let projection = {email :1,password : 1,name : 1}
    return adminDao.findOne(query,projection)
}

function getAdminList(){
    let query = {};
    return adminDao.find();
}

module.exports = {
    adminSignup,
    isAdminExist,
    getAdminList
}