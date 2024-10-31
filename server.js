// // create http server
//  // approach-1

//   const {createServer} = require('http') // http module available 
//   const server = createServer((req,res)=>{
//     res.end('This response is from server') // default GET req handler 
//   })
  
//   // asign port number to server
//   server.listen(3000,()=> console.log('Server on port 3000'))
  // approach-2 (using express module)
    const exp = require('express')
    const app = exp()

    // connect to mongodb server
    const {MongoClient} = require('mongodb')
    MongoClient.connect('mongodb://localhost:27017')
    .then(mClient=>{
      // get db object
      const dbObj = mClient.db('vnrdb')

      //  users collection
      const usersCollectionObj = dbObj.collection('users')
      // prodcuts collection
      const productsCollectionObj = dbObj.collection('products')
      // share userscolelctiont to userApi
      app.set('usersCollectionObj',usersCollectionObj)
      // share producsts collection obj to products api
      app.set('productsCollectionObj', productsCollectionObj) 
      // assign port number
      app.listen(3000,()=>console.log('Server on port 3000'))

      console.log("succeufly connected")
    })
    .catch(err=>console.log("eror in connecting to db",err))

    // add body parser middleware
    // function middleware1(req,res,next){
    // // send res back
    // // move req to next
    // console.log("middleware1 executed");
    // // res.send({message:"This message is from middleware"});
    // next()
    // }
    // function middleware2(req,res,next){
    //   // send res back
    //   // move req to next
    //   console.log("middleware2 executed");
    //   res.send({message:"This message is from middleware"});
    //   }

// using middleware
// application level - exeute midware for every request
    // app.use(middleware1)
    // app.use(middleware2)

    // import user and product apps
    const userApp = require('./APIs/userAPI')
    const productAPP = require('./APIs/productAPI')
    // if its user api
    app.use('/user-api', userApp)
    // if its product api
    app.use('/product-api', productAPP)

    app.use(exp.json())

  