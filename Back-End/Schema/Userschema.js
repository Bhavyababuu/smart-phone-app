const mongoose  = require("mongoose");

const userschema = mongoose.Schema({
    name:{type:String,
          required:true
        },
    uemail:{type:String,
        required:true
        },
    password:{type:String,
        required:true   
        },
    phone:{type:String,
        required:true 
        },
    address:{type:String,
        required:true},
    // role:{
    //     type:Number,
    //     default:0
    }

)
const registration= mongoose.model('registrationusers model',userschema)

module.exports=registration