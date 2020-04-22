// imported necessary module
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// create schema for player to register
const RegisterSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    sports:{
        type:String,
        require:true
    },
    dob:{
        type:Date,
        default:Date.now()
    },
    password:{
        type:String,
        require:true
    }

});
//create modal for Register schema

module.exports=Register=mongoose.model('myRegister',RegisterSchema)

