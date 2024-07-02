const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
  user_id: {
   type: String,
    required: true,
 },
  product_id: {
   type: String,
   required: true,
 },
 price: {
   type: Number,
   required: true,
 },
 quantity: {
   type: Number,
   required: true,
 },
 total: {
   type: Number,
   required: false,
 }
 
 


});

const Cart = mongoose.model('Carts model', cartSchema);

module.exports =Cart




