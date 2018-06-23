var _ = require("lodash");
const adminRouter = require("express").Router();
const resHndlr = require('../responseHandler');
const middleware = require("../middleware");
const adminFacade = require("../admin/adminFacade");
const constants = require("../constants");
const adminValidator = require('./adminValidator');

adminRouter.route("/signup")
    .post([adminValidator.adminSignup], function (req, res) {

        let {email, password, name,age} = req.body;
        let {platform} = req.headers;
        // let file = req.files;
        // console.log('file----------------->',file);

        adminFacade.adminSignup({email, password, name, age})
            .then(function (result) {
                resHndlr.sendSuccess(res, result);
            })
            .catch(function (err) {
            resHndlr.sendError(res, err);
        })
    });


    adminRouter.route("/login")
    .post([adminValidator.adminLogin], function (req, res) {

        let {email, password} = req.body;
        let {platform} = req.headers;  

        adminFacade.adminLogin({email, password})
            .then(function (result) {
                resHndlr.sendSuccess(res, result);
            })
            .catch(function (err) {
            resHndlr.sendError(res, err);
        })
    });    

    adminRouter.route("/getAdminList")
    .post([middleware.authenticate.autntctTkn], function (req, res) {

        let {email, password} = req.body;
        let {platform} = req.headers;  

        adminFacade.getAdminList()
            .then(function (result) {
                resHndlr.sendSuccess(res, result);
            })
            .catch(function (err) {
            resHndlr.sendError(res, err);
        })
    });    


    adminRouter.route("/logout")
    .post([middleware.authenticate.autntctTkn], function (req, res) {

        // let {adminId} = req.body;
        // let {accesstoken,platform} = req.headers;  

        adminFacade.logout(req)
            .then(function (result) {
                resHndlr.sendSuccess(res, result);
            })
            .catch(function (err) {
            resHndlr.sendError(res, err);
        })
    });  


module.exports = adminRouter;    