const mongoose = require('mongoose')
const productschema = mongoose.Schema({
    productname:{type:String},
    category:{type:String},
    price:{type:String},
    description:{type:String},
    image: {
        type:String
      },
    

    
})
const product=mongoose.model('products model',productschema)
module.exports=product