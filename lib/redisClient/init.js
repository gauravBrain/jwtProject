var Promise = require('bluebird');
var redis = require('redis');
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);
var client;
var _ = require("lodash");
const appConstants = require("../constants");
const config = require("../config");
const logger = require("../logger");

var init = function () {
    
    //Redis default connection ( port : 6389 server : 'localhost')
    client = redis.createClient();
    
    return client.onAsync("error")
        .then(function (err) {
            logger.info({error: err});
        })
};

exports.setValue = function (key, value) {
    return client.setAsync(key, value)
        .then(function (resp) {
            if (resp) {
                logger.info({"value": resp}, "_redisSetValue");
                return resp;
            }
        })
    .catch(function(err) {
            return err;
        })
};

exports.getValue = function (key) {
    return client.getAsync(key)
        .then(function (res) {
            return res;
        })
    .catch(function(err) {
            return err;
        })
    //client.get(key, function (err, res) {
    //    if (err) {
    //        logger.ERROR({"error": err}, "redis getValue");
    //        callback(null);
    //    } else {
    //        callback(res);
    //    }
    //});
};

exports.expire = function (key, expiryTime) {
    return client.expireAsync(key, expiryTime)
    .then(function(resp) {
            logger.info({expire : resp}, "_expireToken")
            return resp;
        })
    .catch(function(err) {
            logger.error({"error" : err}, "_expireToken")
        })
};

exports.delValue = function (key) {
    return client.delAsync(key)
        .then(function (resp) {
            console.log("key " + key + " deleted. response is " + resp);
            return resp;
        })
        .catch(function (err) {
            throw err;
        })
}

init();
