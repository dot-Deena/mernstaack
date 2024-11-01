// mini exp() app
const exp = require('express')
const productApp = exp()
// import the product schema/model
const product = require('../models/productmodel')
productApp.use(exp.json())


// operations
// get 
productApp.get('/products',async(req,res)=>{
    const productList = await product.find()
    res.send({message:"products",payload:productList})
})
// get (users by hash value whihc is obejct id)
productApp.get('/products/:_id',async(req,res)=>{
    try{
        const Product = await product.findById(req.params._id)
        res.send({message:"product", payload:Product})
    }catch(err){
        res.send({message:"error",payload:err.message})
    }
})
// get user based on some field
productApp.get('/product/:name',async(req,res)=>{
    try{
        const Product = await product.findOne({name:req.params.name})
        res.send({message:"product", payload:Product})
    }catch(err){
        res.send({message:"error",payload:err.message})
    }
})
// post 
productApp.post('/product', async(req,res)=>{
    const newproduct = req.body // getting new user data
    const pdoc = new product(newproduct) // create a collection for it
    await pdoc.save() // save it
    res.send({message:"new product created"})

})
// update user
productApp.put('/product', async(req,res)=>{
    try{
        const updatedproduct = req.body
        let updateproduct =  await product.findOneAndUpdate({id:updatedproduct.id},{$set:{...updatedproduct}},{new:true})
        res.send({message:"product", payload:updateproduct})
    }catch(err){
        res.send({message:"error",payload:err.message}) 
    }
})



// export
module.exports=productApp