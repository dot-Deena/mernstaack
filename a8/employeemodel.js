const mongoose = require('mongoose')


const addressSchema = new mongoose.Schema({
    city:{
        type:String,
        required:true 
    },
    state:{
        type:String,
        required:true 
    },
    pincode:{
        type:Number,
        required:true 
    }
})

const EmployeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3
    },
    skills:{
        type:[String], // array of primitive type (string)
        required:true 
    },
    address:{
        type:addressSchema
    },
    prevExperiences:{
        type:[String],
        required:true
    }
},{"strict":"throw"})

const employee = mongoose.model('employee',EmployeSchema)
module.exports = employee
