console.log('<------------------------starting authApp----------------------->');

//Import Config
const config = require('./lib/config');

//auto backup
// require('./lib/backupScript');

// Import logger
var logger = require('./lib/logger').logger;

config.dbConfig(config.cfg, (err) => {
    if (err) {
        logger.error(err, 'exiting the app.');
        return;
    }

    // load external modules
    const express = require("express");

    // const mediaUpload = require("./lib/mediaupload/configure")();
    // mediaUpload();

    // init express app
    const app = express();

    // set server home directory
    app.locals.rootDir = __dirname;

    // config express
    config.expressConfig(app, config.cfg.environment);

    // attach the routes to the app
    require("./lib/route")(app);

    // start server
    app.listen(config.cfg.port, () => {
        logger.info(`Express server listening on ${config.cfg.port}, in ${config.cfg.TAG} mode`);
        console.log(`Api --> http://localhost:${config.cfg.port}/apiDocs` );
    });

    
});
