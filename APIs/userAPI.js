// create mini exp() app
const exp = require('express')
const userApp = exp.Router()
// import userschema's model
const user = require('../models/usermodel')
userApp.use(exp.json())

// operations
// get
userApp.get('/users',async(req,res)=>{

      const userList = await user.find()
      res.send({message:"users",payload:userList})

})
// post
userApp.post('/user',async(req,res)=>{
    const newuser = req.body
    // create user doctument
    const userdoc =  new user(newuser)
   // save to db
    await userdoc.save()
    res.send({message:"new user created"})

})




// export 
module.exports=userApp
