const exp = require('express')
const productApp = exp.Router();
// mini app
productApp.use(exp.json())
// route to handle get products
productApp.get('/products',async(req,res)=>{
    const productsCollectionObj = req.app.get('productsCollectionObj')
    const productsList = await productsCollectionObj.find().toArray()
    res.send({message:"products", payload:productsList})
  })
  
  // route to handle products by ID(url param)
productApp.get('/products/:id',async(req,res)=>{
    const productsCollectionObj = req.app.get('productsCollectionObj')
    // get id from url
    const pId = Number(req.params.id);
    // find user by id
    const productObj = await productsCollectionObj.findOne({pId:pId})
    // send res 
    res.send({message:"products",payload:productObj});
  })
  
  
  // route to handle create user
productApp.post('/products',async(req,res)=>{
    const productsCollectionObj = req.app.get('productsCollectionObj')
    const newProduct = req.body;
    // insert into db
    await productsCollectionObj.insertOne(newProduct)
    res.send({message:"new product created"})
  })
  
  
  // route to handle update user
userApp.put('/products',async(req,res)=>{
    const productsCollectionObj = req.app.get('productsCollectionObj')
    // get user from req.body
    const modifiedProduct = req.body
    const pId = modifiedProduct.age
    // modify user
    let dbRes = await productsCollectionObj.updateOne({pId:pId},
      {$set:{...modifiedProduct}})
      console.log(dbRes)
      if(dbRes.modifiedCount===1){
        res.send({message:"product updated"})
      }else{
        res.send({message:"product not modified"})
      }
  })
  
  
  // route to handle delete user by id
productApp.delete('/products/:id',(req,res)=>{
    const productsCollectionObj = req.app.get('productsCollectionObj')
  })
module.exports= productApp;
