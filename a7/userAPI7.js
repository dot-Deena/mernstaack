// create mini exp() app
const exp = require('express')
const userApp = exp.Router()
// import userschema's model
const bcryptjs = require('bcryptjs')
const user = require('../models/usermodel')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middlewares/verifyToken')
userApp.use(exp.json())

// post
userApp.post("/user",async(req,res)=>{
    try{
    // get user from client    
    let newuser = req.body;
   // hash password
    let hashedpassword = await bcryptjs.hash(newuser.password,6)
         // replace plain text w hash
    newuser.password = hashedpassword;
     // cteaye doc (convert json)
     let newuserdoc = new user(newuser)
     await newuserdoc.save();
     res.send({message:"user created"});
    }catch(err){
        res.send({message:"error",payload:err.message});
    }
})

// user login
userApp.post('/login', async(req,res)=>{
     let usercred = req.body
     // verify creds
     let user1 = await user.findOne({username:usercred.username})
     // if not found
     if(user1===null){
        res.send({message:"user not found"})
     }else{
        // compare passwords (plain/hash)
       let result = bcryptjs.compare(usercred.password,user1.password)
       // if not matched
       if(result===false){
        res.send({message:"invalid password"})
       }else{
        // create JWT token
        let signedtoken = jwt.sign({username:user1.username},'abcdef',{expiresIn:2000})
        // send token as res
        res.send({message:"login success", token:signedtoken,user:user1})
       }
     }
})

// protected (private) route
userApp.get('/protected', verifyToken, (req, res)=>{
    res.send({message:"protected data"})
}) 
// middlware executes first if eveyrtging else valid, goes into res

// export 
module.exports=userApp
