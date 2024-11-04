// create mini exp() app
const exp = require('express')
const userApp = exp.Router()
// import userschema's model
const bcryptjs = require('bcryptjs')
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

// // post
userApp.post('/user',async(req,res)=>{
    try{
    // get user from client    
    let newuser = req.body;
    //  check for duplicate user
    let user1 = await user.findOne({username:newuser.username})
    // if user exists w same usrname
    if(user1!==null){
        res.send({message:"user alr exists"})
    }else{
        let hashedpassword = await bcryptjs.hash(newuser.password,6)
         // replace plain text w hash
    newuser.password = hashedpassword;
     // cteaye doc (convert json)
     let newuserdoc = new user(newuser)
     console.log(newuserdoc);
     await newuserdoc.save();
     res.send({message:"user created"});
    }
    }catch(err){
        res.send({message:"error",payload:err.message});
    }
})





// export 
module.exports=userApp
