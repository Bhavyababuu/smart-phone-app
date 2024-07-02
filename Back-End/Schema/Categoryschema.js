const mongoose = require('mongoose')
const categoryschema = mongoose.Schema({
    categoryname:{type:String}
     
    
    
})
const category=mongoose.model('categorys model',categoryschema)
module.exports=category