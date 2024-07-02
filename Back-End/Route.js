const express = require('express')
const formidable = require('formidable')
const cors =require('cors')
const multer = require('multer');
const path = require('path');
const bcrypt= require("bcrypt")


const bodyparser = require("body-parser");

const{ Createproduct, Viewproduct,viewsingleproduct, removeproduct, updateproduct, imageview, download}= require('./controller/productcontroller');
const {registerpost, registerget, signup, loginuser}= require('./controller/Usercontroller.js');
const { Viewadmin,  adminLogin, adminregisteration} = require('./controller/Admincontroller.js');
const { Addcategory, Viewcategory, viewsinglecategory, removecategory, updatecategory } = require('./controller/Categorycontroller');
const {addCart, Viewcart, removecart, deleteCart} = require('./controller/Addtocartcontroller');
const router = express.Router()

const app =express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  }));


  app.use(express.static(path.join(__dirname, 'uploads')));

  
const imageDirectory = path.join(__dirname, './uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageDirectory);
  },
  filename: function (req, file, cb) {
    console.log("File name is:" + file.originalname);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
  

app.post('/Addproduct',upload.single('image'),(Createproduct))
app.get('/Viewimage/:fileName', imageview);

app.get('/download',(download))

app.get('/Viewproduct',(Viewproduct))
app.get('/viewsingleproduct/:id',(viewsingleproduct))
app.get('/deleteproduct/:id',(removeproduct))
app.post('/updateproduct',(updateproduct))

//admin route

app.post('/adminlogin',(adminLogin))

app.post('/registrationadmin',(adminregisteration))
app.get('/Viewadmin',(Viewadmin))

//user route//
app.post('/userreg',(registerpost))
app.get('/userget',(registerget))
app.post('/logins',(signup))

app.post('/login',(loginuser))




//Add to cart route
app.post('/Addcart',(addCart))
app.post('/deletecart',(deleteCart))


app.get('/Viewcart',(Viewcart))
app.get('/removecart/:id',(removecart))
// app.delete('/deletecartproduct/:id',(removecartproduct))
// app.post('/updatecartproduct/:id',(updatecartproduct))

//category

app.post('/Addcategory',(Addcategory))
app.get('/Viewcategory',(Viewcategory))
app.get('/viewsinglecategory/:id',(viewsinglecategory))
app.get('/deletecategory/:id',(removecategory))
app.post('/updatecategory',(updatecategory))



module.exports=app
