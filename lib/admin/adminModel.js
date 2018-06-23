const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = new Schema({
    name : {type : String},
    email : {type : String,required : true},
    password : {type : String,required : true},
    age : {type : Number,required : true},
    isDeactivated: {type: Boolean, default: false},
    created: {type: Number, default: Date.now},
    updated: {type: Number, default: Date.now},

})



AdminSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.created;
    delete obj.updated;
    delete obj.password;
    return obj;
};


//Export admin module
Admin = module.exports = mongoose.model("Admin", AdminSchema);
