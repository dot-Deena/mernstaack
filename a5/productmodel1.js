const mongoose = require('mongoose')

//schema
const productSchema = new mongoose.Schema({
    id:{
        type:Number,
        unqiue:true,
        required:true
    },
    name:{
        type:String,
        required:true,
        minLength:2,
        maxLength:10
    },
    type:{
        type:String,
        required:true,
        maxLength:10,
        minLength:2
    }
})
// constructor (model)
const product = mongoose.model('product',productSchema)
// export the model
module.exports=product;