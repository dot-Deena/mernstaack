 // create express app
 const exp = require('express')
 const app = exp()
 // import userAPI
 const userApp = require('./APIs/userAPI')
 const productApp = require('./APIs/productAPI') // import product api
 // import mongoose
 const mongoose = require('mongoose')


 // pass specific api for res,req
app.use('/user-api',userApp) 
app.use('/product-api',productApp) // use the imported product api here


// DB connectin
mongoose.connect('mongodb://localhost:27017/testvnr')
.then(()=>{console.log("connected succeduly")
          // assign port
app.listen(3000,()=>console.log('http server on port 3000 '))})
.catch(err=>console.log('error in connecton', err))
