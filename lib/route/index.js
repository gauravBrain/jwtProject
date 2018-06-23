const adminRouter = require('../admin/adminRoute');



module.exports = function(app){

    //attach Routes
    app.use('/jwtApp/api/v1/admin',adminRouter);
}