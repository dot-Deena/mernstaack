// create mini exp() app
const exp = require('express')
const userApp = exp.Router()
// import userschema's model
const user = require('../models/usermodel')
userApp.use(exp.json())

// operations
// get (all users)
userApp.get('/users',async(req,res)=>{
    try{
      const userList = await user.find()
      res.send({message:"users",payload:userList})
    }catch(err){
        res.send({message:"error",payload:err.message})
    } 
})
// get (users by hash value whihc is obejct id)
userApp.get('/users/:_id',async(req,res)=>{
    try{
        const User = await user.findById(req.params._id)
        res.send({message:"user", payload:User})
    }catch(err){
        res.send({message:"error",payload:err.message})
    }
})
// get user based on some field
userApp.get('/user/:name',async(req,res)=>{
    try{
        const User = await user.findOne({name:req.params.name})
        res.send({message:"user", payload:User})
    }catch(err){
        res.send({message:"error",payload:err.message})
    }
})
// post
userApp.post('/user',async(req,res)=>{
    try{
    const newuser = req.body
    // create user doctument
    const userdoc =  new user(newuser)
   // save to db
    await userdoc.save()
    res.send({message:"new user created"})
    }catch(err){
        res.send({message:"error",payload:err.message}) 
    }
})
// update user
userApp.put('/user', async(req,res)=>{
    try{
        const updatedUser = req.body
        let updateuser =  await user.findOneAndUpdate({id:updatedUser.id},{$set:{...updatedUser}},{new:true})
        res.send({message:"user", payload:updateuser})
    }catch(err){
        res.send({message:"error",payload:err.message}) 
    }
})




// export 
module.exports=userApp
