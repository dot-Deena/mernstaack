const mongoose = require('mongoose')

// create schema(document or schema of one object or collection)
const userSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:5 
    },
    age:{
        type:Number,
        min:10,
        max:30
    }
})
// create model(constructor for the schema)
const user =  mongoose.model('user',userSchema)
// export the model (call ittt )
module.exports=user;