const category = require("../Schema/Categoryschema")

const Addcategory=async(req,res)=>{
    try{
        await category.create([
            {
                categoryname:req.body.categoryname,
                
  

            },
        ])
        res.status(201).json({message:"category created"})
    }catch{
        res.status(500).json({message:"failed to create category",error:error.message})
    }
}
const Viewcategory=async(req,res)=>{
    const data =await category.find()
    try{
        res.send(data)
    }catch(error){
        res.send(error)
    }
}


const viewsinglecategory =async(req,res)=>{
    const id=req.params.id
    const singlecategory=await category.findById({_id:id})
    res.json(singlecategory)
}
const removecategory=async(req,res)=>{
    const id=req.params.id
    const removecategory=await category.findByIdAndRemove({_id:id})
    // res.json(removeproduct)
    res.json({msg:"category removed",removecategory:removecategory})

}
const updatecategory=async(req,res)=>{
    const {categoryname}=req.body
    console.log("categoryname:"+req.body.categoryname);
    
    const _id=req.body.id;
    console.log("id:"+req.body.id);
    
    const updatecatagory=await category.findByIdAndUpdate(_id,{categoryname})
    res.json({msg:"product updated",updatecatagory:updatecatagory})

}


module.exports={Addcategory,Viewcategory,viewsinglecategory,removecategory, updatecategory}