const express = require('express');
const product = require('./Schema/productschema');
const cors =require('cors')
const path=require('path')

const connectDB = require('./Database')
const mongoose= require('mongoose')
var bodyParser=require('body-parser');


const addcart = require('./Schema/addtocartschema');
const app = express();

app.use('/uploads', express.static('uploads'))


connectDB()
const PORT = process.env.PORT || 5000 

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  }));


//product//
const Route=require("./Route")
app.use("/api/admin",Route)



//user//
const userRoute=require("./Route")
app.use("/api/user",userRoute)


//add to cart
const AddtocartRoute=require("./Route")
app.use("/api/cart",AddtocartRoute)

//category


const categoryRoute=require("./Route")
app.use("/api/category",categoryRoute)



app.listen(PORT,()=>{
    console.log("the server is running at port 5000");
})