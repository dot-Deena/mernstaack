const mongoose = require('mongoose')

// create schema(document or schema of one object or collection)
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true,
        min:18,
        max:50
    }
})
// create model(constructor for the schema)
const user =  mongoose.model('user',userSchema)
// export the model (call ittt )
module.exports=user;