const exp = require('express')
const empApp = exp.Router()
empApp.use(exp.json())
let Employee = require('../models/employeemodel')
const expressAsyncHandler = require('express-async-handler')
// const 

empApp.post('/employee', expressAsyncHandler(async(req,res)=>{
    
    let newemp = req.body;
    let empdoc = new Employee(newemp)
    await empdoc.save()
    res.send({message:"employee created"})
   }))


module.exports = empApp