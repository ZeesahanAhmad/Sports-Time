const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UpdatePlayerProfileSchema=new Schema({
    // user Id will be same as playerRegister Id
    user:{
        type:Schema.Types.ObjectId,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    profilepic:{
        type:String,
        default:"node.jpg"
    },
    introduction:{
        type:String,
        default:"Explain who are you !"
    },
    // different routes for address
    address:{
        country:{
            type:String,
            require:true
        },
        state:{
            type:String,
            require:true
        },
        city:{
            type:String,
            require:true
        },
        Phone:{
            type:[String],
            require:true

        }

    },
    // different routes for achievements
    achievements:[{

        tournament:{
            type:String,
            require:true
        },
        medal:{
            type:String,
            require:true
        }

    }]
    






});

module.exports=UpdatePlayerProfile=
mongoose.model("myUpdatePlayerProfile",UpdatePlayerProfileSchema);
