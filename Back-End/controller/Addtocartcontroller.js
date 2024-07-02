const Cart = require("../Schema/addtocartschema");



// Controller functions for the cart
//   const addToCart= async (req, res) => {
    
//     //  console.log("user id  is:"+req.body.user_id);
//     try{
      
//       await Cart.create(req.body);
//       res.status(201).json({message:"product created successfully"})
//   }catch{
//       res.status(500).json({message:"failed to create product"})
//   }
//   }

//   const Viewcart =async(req,res)=>{
//     const data =await Cart.find()
//     try{
//         res.send(data)
//     }catch(error){
//         res.send(error)
//     }
// }

// const viewsinglecart =async(req,res)=>{
//     const id=req.params.id
//     const singlecart=await Cart.findById({_id:id})
//     res.json(singlecart)
// }

//   module.exports={addToCart,Viewcart,viewsinglecart}



const addCart = async (req, res) => {
    console.log("in add cart");

    try {

        const conditions = {
            product_id: req.body.product_id,

        };

        const comList = await Cart.findOne(conditions);
        let s = "product exists";
        if (comList) {
            console.log(s);
            console.log(comList);
            let p = comList.price;
            let q = comList.quantity + 1;
            console.log("price is:" + p);
            console.log("Total is:" + q);
            let t = p * q;
            await Cart.updateMany(
                { _id: comList._id },
                { $set: { quantity: q, total: t } }
            );
            console.log('Cart updated...!');

        } else {

            console.log('Product Document not found');
            const seed = await Cart.create(req.body);
            console.log(req.body.user_id);
            console.log(req.body.product_id);
            console.log(req.body.price);
            let p = req.body.price;
            let q = req.body.quantity;
            console.log(req.body.quantity);
            total = p * q;
            console.log("Total is:" + total);
            s = "product not exists";

        }

        const cartList = await Cart.find();
        res.send(cartList);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error
        });
    }
}

const Viewcart =async(req,res)=>{
        const data =await Cart.find()
        try{
            res.send(data)
     }catch(error){
           res.send(error)
         }
 }


 const removecart=async(req,res)=>{
    const id=req.params.id
    const removeproduct=await Cart.findByIdAndRemove({_id:id})
    // res.json(removeproduct)
    res.json({msg:"product removed",removeproduct:removeproduct})

}

const deleteCart = async (req, res) => {
    console.log("in delete cart");

    try {

        const conditions = {
            product_id: req.body.product_id,

        };

        const comList = await Cart.findOne(conditions);
        let s = "product exists";
        if (comList) {
            console.log(s);
            console.log(comList);
            let p = comList.price;
            let q = comList.quantity - 1;
            console.log("price is:" + p);
            console.log("Total is:" + q);
            let t = p * q;
            await Cart.updateMany(
                { _id: comList._id },
                { $set: { quantity: q, total: t } }
            );
            console.log('Cart updated...!');

        } else {

            console.log('Product Document not found');
            const seed = await Cart.create(req.body);
            console.log(req.body.user_id);
            console.log(req.body.product_id);
            console.log(req.body.price);
            let p = req.body.price;
            let q = req.body.quantity;
            console.log(req.body.quantity);
            total = p * q;
            console.log("Total is:" + total);
            s = "product not exists";

        }

        const cartList = await Cart.find();
        res.send(cartList);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error
        });
    }
}



module.exports={addCart,Viewcart,removecart,deleteCart}


