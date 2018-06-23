module.exports = {
    enviroment : 'staging',
    ip : 'localhost',
    port : 3200,
    protocol : 'http',
    TAG : 'staging',
    mongo : {
        dbName : 'jwt',
        dbUrl : 'mongodb://localhost:27017/',
        user : 'jwtUser',
        pass : 'jwtUser',
        server : {socketOptions : {keepAlive : 1,connectTimeoutMS:30000}},
        replset : {socketOptions : {keepAlive : 1,connectTimeoutMS:30000}}
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