const crones = require('./croneUtils');
const fs = require('fs');
const _ = require('lodash');
const Promise = require('bluebird');
const cmd = require('node-cmd');
const getAsync = Promise.promisify(cmd.get, {multiArgs: true, context: cmd})


var dbOptions = {
    autoBackup: true,
    removeOldBackup: false,
    autoBackupPath: './db_backup',
    host: 'localhost',
    port: 27017,
    database: 'jwt',
    user: 'jwtUser',
    pass: 'jwt',
}


/* return date object */
stringToDate = function (dateString) {
    return new Date(dateString);
};



// Auto backup script
function dbAutoBackUp() {
    // check for auto backup is enabled or disabled
    if (dbOptions.autoBackup) {
        var date = new Date();
        var beforeDate, oldBackupDir, oldBackupPath;
        var currentDate = stringToDate(date); // Current date
        var newBackupDir = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
        var newBackupPath = dbOptions.autoBackupPath + '/' + newBackupDir; // New backup path for current backup process
        var removeBackupDir = dbOptions.autoBackupPath + '/' + currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + (currentDate.getDate() - 1);

        // check for remove old backup after keeping # of days given in configuration
        if (dbOptions.removeOldBackup) {
            let removeCmd = 'rm -rf' + ' ' + removeBackupDir;
            if(fs.existsSync(removeBackupDir)){
                getAsync(removeCmd).then(data => {
                    console.log('Old database successfully removed');
                }).catch(err => {
                    console.log('Error in removing old backup');
                })
            }

        }
        var createCmd = 'mongodump --host ' + dbOptions.host + ' --port ' + dbOptions.port + ' --db ' + dbOptions.database + ' --username ' + dbOptions.user + ' --password ' + dbOptions.pass + ' --out ' + newBackupPath; // Command for mongodb dump process

        getAsync(createCmd).then(data => {
            console.log('backup for '+newBackupPath+' Created successfully.')
          }).catch(err => {
            console.log('Error in creating backup')
          })

    }
}


crones.getCronForMidNight(dbAutoBackUp);