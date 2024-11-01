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
// post 
productApp.post('/product', async(req,res)=>{
    const newproduct = req.body // getting new user data
    const pdoc = new product(newproduct) // create a collection for it
    await pdoc.save() // save it
    res.send({message:"new product created"})

})



// export
module.exports=productApp