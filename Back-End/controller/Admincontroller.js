const admin = require("../Schema/Adminschema");

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cors=require('cors')
require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());

app.use(cors());



    
 const adminregisteration=async(req,res)=>{
     
       const{adminname,email,password}=req.body
       try{
        const hashedPassword = await bcrypt.hash(password, 10);
    const details = await admin.create({ adminname, email, password: hashedPassword });
    if(!adminname){
      return res.send({error:"Name is required"})
    }
    if(!email){
      return res.send({error:"Email is required"})
    }
    if(!password){
      return res.send({error:"Password is required"})
    }
   

    const existinguser=await admin.findOne({email})
    if(existinguser){
      return res.status(200).send({
        success:true,
        message:"Already register please login"
      })
    }
    res.json({ message: 'Registration successful',details:details });
    const secretKey = req.body.name;  
   const payload = {
   adminId: req.body.email,
   adminname: req.body.adminname,
   };
 
 const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
 
 console.log('Generated Token:', token);

  } catch (error) {
    console.log(error);
  }
 }
       
 

  
        
    
    const Viewadmin =async(req,res)=>{
        const data =await admin.find()
        try{
            res.send(data)
        }catch(error){
            res.send(error)
        }
    }


    

    const adminLogin = async (req, res) => {
      console.log("in login");
        const { adminname,email, password } = req.body;
  
      var uid = req.body.admin_id;
      var pwd = req.body.password;
      console.log("uid:"+uid);
      console.log("password :"+pwd);
      
      try {
        const user = await admin.findOne({ email });
  
              if (!user) {
                  return res.status(401).json({ error: 'User not found. Please register first.' });
              }
        
              const passwordMatch = await bcrypt.compare(password, user.password);
        
              if (!passwordMatch) {
                  return res.status(401).json({ error: 'Invalid password.' });
              } else {
                res.send("0");
                console.log('Document not found');
            }
      
        
              const secretKey = req.body.adminname// Use a secret key from the environment variable
              const payload = {
                  adminId: user.email,
                  adminname: user.adminname,
              };
        
          
          // const secretKey = req.body.name;  
    
          // const payload = {
          //     userId: uid,
          //     password: pwd,
          // };
    
          const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    
    
          // const conditions = {
          //     userId: uid,
          //     password: pwd
          // };
    
          // const comList = await registration.findOne(conditions);
    
          // if (comList) {
          //     res.send(token);
          //     console.log(comList);
          // } else {
          //     res.send("0");
          //     console.log('Document not found');
          // }
    
      }
      catch (error) {
          console.log(error);
          return res.status(500).json({
              message: error
          });
      }
    };
    
    
        
      
  

      

    module.exports ={adminregisteration,Viewadmin,adminLogin}