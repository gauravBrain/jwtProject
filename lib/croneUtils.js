CronJob = require('cron').CronJob;


// this will execute on the server time at 00:01:00 each day by server time
function getCronForMidNight(callback) {

    new CronJob('00 01 00 * * *', callback, null, true);

}


// this will execute on the server after half an hour
function getCronForHalfHour(callback) {

    new CronJob('00 */30 * * * *', callback, null, true);


}

// this will execute on the server after 5 mins
function getCronFor5mins(callback) {

    new CronJob('00 */5 * * * *', callback, null, true);


}

// this will execute on the server after 1 mins
function getCronFor1mins(callback) {

    new CronJob('00 * * * * *', callback, null, true);

}


module.exports = {
    getCronForMidNight: getCronForMidNight,
    getCronForHalfHour: getCronForHalfHour,
    getCronFor5mins: getCronFor5mins,
    getCronFor1mins: getCronFor1mins
}