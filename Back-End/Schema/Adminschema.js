const mongoose  = require("mongoose");

const adminschema = mongoose.Schema({
    adminname:{type:String},
    email:{type:String},
    password:{type:String}

})
const admin= mongoose.model('admins model',adminschema)

module.exports=admin