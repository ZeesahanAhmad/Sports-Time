// imported necessary module
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// create schema for player to register
const PlayerRegisterSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    sports:{
        type:[String],
        require:true
    },
    dob:{
        type:Date,
        default:Date.now()
    },
    gender:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }

});
//create modal for Register schema

module.exports=PlayerRegister=mongoose.model('myPlayerRegister',PlayerRegisterSchema)

