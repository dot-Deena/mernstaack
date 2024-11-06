 // create express app
 const exp = require('express')
 const app = exp()
 // import userAPI
 const userApp = require('./APIs/userAPI')
 const productApp = require('./APIs/productAPI') // import product api
 const studentApp = require('./APIs/studentAPI.js')
 const employeeApp = require('./APIs/employeeAPI.js')
 // import mongoose
 const mongoose = require('mongoose')


 // pass specific api for res,req
app.use('/user-api',userApp) 
app.use('/product-api',productApp) // use the imported product api here
app.use('/student-api',studentApp)
app.use('/employee-api',employeeApp)


// DB connectin
mongoose.connect('mongodb://localhost:27017/testvnr')
.then(()=>{console.log("connected succeduly")
          // assign port
app.listen(3000,()=>console.log('http server on port 3000 '))})
.catch(err=>console.log('error in connecton', err))

// error handling middleware
// app.use((err,req,res,next)=>{
//     res.send({message:"error",error:err.message})
// })
