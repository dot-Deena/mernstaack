const exp = require('express')
const userApp = exp.Router();
 // mini app
userApp.use(exp.json())

// route to handle get users
userApp.get('/users',async(req,res)=>{
  const usersCollectionObj = req.app.get('usersCollectionObj')
  const usersList = await usersCollectionObj.find().toArray()
  res.send({message:"users", payload:usersList})
})

// route to handle users by ID(url param)
userApp.get('/users/:id',async(req,res)=>{
  const usersCollectionObj = req.app.get('usersCollectionObj')
  // get id from url
  const userId = Number(req.params.id);
  // find user by id
  const userObj = await usersCollectionObj.findOne({age:userId})
  // send res 
  res.send({message:"user",payload:userObj});
})


// route to handle create user
userApp.post('/user',async(req,res)=>{
  const usersCollectionObj = req.app.get('usersCollectionObj')
  const newUser = req.body;
  // insert into db
  await usersCollectionObj.insertOne(newUser)
  res.send({message:"new user created"})
})


// route to handle update user
userApp.put('/user',async(req,res)=>{
  const usersCollectionObj = req.app.get('usersCollectionObj')
  // get user from req.body
  const modifiedUser = req.body
  const userId = modifiedUser.age
  // modify user
  let dbRes = await usersCollectionObj.updateOne({id:userId},
    {$set:{...modifiedUser}})
    console.log(dbRes)
    if(dbRes.modifiedCount===1){
      res.send({message:"user updated"})
    }else{
      res.send({message:"user not modified"})
    }
})


// route to handle delete user by id
userApp.delete("/users/:id", async (req, res) => {
  //get usersCollectionObj
  const usersCollectionObj = req.app.get("usersCollectionObj");
  //get id from url
  const userId = Number(req.params.id);
  //delete
  let dbRes = await usersCollectionObj.deleteOne({ id: userId });
  console.log(dbRes);
  if (dbRes.deletedCount === 1) {
    res.send({ message: "User deleted" });
  } else {
    res.send({ message: "No user deleted" });
  }
});
module.exports= userApp;