const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const express = require('express');
const app = express();
require('dotenv').config();

const registration=require("../Schema/Userschema")
app.use(express.json());



const registerpost = async(req,res)=>{
  const {name,uemail,password,phone,address}=req.body
   
    if(!name||!uemail||!password||!address||!phone){
      return res.json({msg:"please fill the fields"})

    }
    if(password.length<8 || password.length>10){
      return res.json({msg:"please enter  8 to 10 charater"})

    }

    if(phone.length<10|| phone.length>10){
      return res.json({msg:"please enter   10 charater"})

    }

    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password,salt)
  
const   regiterdetails = await registration.create({name,uemail,password:hashedpassword,phone,address})

   Token = gentoken(regiterdetails._id)
   console.log({regiterdetails})

res.json({msg:"data inserted",regiterdetails:regiterdetails,Token:Token})

}

const registerget =async(req,res)=>{
  const data =await registration.find()
  try{
      res.send(data)
  }catch(error){
      res.send(error)
  }
}

const signup = async(req,res)=>{
const {name,uemail,password}=req.body

const name1= await registration.findOne({name})
const mail= await registration.findOne({uemail})
const pass= await registration.findOne({password})
if(name1 && mail && pass){
return res.json('Login sucess')
}else{
return res.json('please check data')
}


}

const loginuser = async(req,res)=>{
const {password,uemail} = req.body

const finduser = await registration.findOne({uemail})

if(finduser && bcrypt.compareSync(password,finduser.password)){

    res.json('Logined sucess')
}else{
res.json('email and password not correct')
}
}

const gentoken=(id)=>{
return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1d'})
}
module.exports={registerpost,registerget,signup,loginuser}