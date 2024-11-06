const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next ) => {
      // get bearer token
      let bearerToken = req.headers.authorization;
      // if token not found
      if(!bearerToken){
        res.send({message:"unauthorized access "})
      }else{
        // extract token (remove whitespace in req url)
        let token = bearerToken.split(" ")[1]
        // verify token
        try{
        let decodedToken = jwt.verify(token,'abcdef')
          next()
        }catch(err){
            res.send({message:"relogin to continue"})
        }
      }
}

module.exports = verifyToken