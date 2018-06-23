const _ = require('lodash');
const dbConfig = require('./dbConfig');
const expressConfig = require('./expressConfig');
const path = require('path');
var envConfig = {};
var cfg = {};
var enviroment = process.env.NODE_ENV || 'dev';


//ENV Config
switch(enviroment){
    case 'dev' : 
    case 'development' :
    envConfig = require('./env/development');
    break;

    case 'stag' : 
    case 'staging' :
    envConfig = require('./env/staging');
    break;

    case 'prod' : 
    case 'production' :
    envConfig = require('./env/production');
    break;
}


var defaultConfig = {
    enviroment : 'development',
    ip : 'localhost',
    port : 3200,
    protocol : 'http',
    TAG : 'development',
    uploadDir : path.resolve('./uploads'),
    mongo : {
        dbName : 'jwt',
        dbUrl : 'mongodb://localhost:27017/',
        user : 'jwtUser',
        pass : 'jwtUser',
        server : {socketOptions : {keepAlive : 1,connectTimeoutMS:30000}},
        replset : {socketOptions : {keepAlive : 1,connectTimeoutMS:30000}},
        autoBackup : true
    },
    redis : {
        server : 'localhost',
        port : 6389
    },
    swagger_port : 80,

    //from dynamic values Depending on env
    from : function(){
        var swagger_port = this.swagger_port ? this.swagger_port : this.port;
        var server_address = this.protocol +"://"+this.ip+":"+swagger_port;        
    }
}


//create final config JSON by extending env from default
var cfg = _.extend(defaultConfig,envConfig);


//Export
module.exports = {
    cfg,
    dbConfig,
    expressConfig
}