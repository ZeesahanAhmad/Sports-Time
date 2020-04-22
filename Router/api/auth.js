// Register and Login code will go here
const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jsonwt=require('jsonwebtoken');
var Register=require('../../Modal/Register');
const key=require('../../variable/url').secreteKey;








//@router:api/auth/register
//@method:post
//@desc:route for register (player)
//@access:public

router.post('/register',(req,res)=>{
    Register.findOne({email:req.body.email})
    .then(register=>{
        if(register){
            res.json({message:'email already exist !'})
        }
        else{
            const info={};
            info.name=req.body.name,
            info.email=req.body.email,
            info.sports=req.body.sports,
            info.dob=req.body.dob,
            info.password=req.body.password
            //code to encrypt password.
            bcrypt.genSalt(10, (err, salt)=> {
                bcrypt.hash(info.password, salt, (err, hash)=> {
                
                if(err) throw err;
                info.password=hash;

            new Register(info)
            .save()
            .then(register=>{
                res.json(register);
            })
            .catch(err=>console.log(err));
                
        });
    });
            
        }

    })
    .catch(err=>console.log(err));



});


//@router:api/auth/login
//@method:post
//@desc:route for login (player)
//@access:public

router.post('/login',(req,res)=>{
    var email=req.body.email;
    var password=req.body.password;

    Register.findOne({email:email})
    .then((register)=>{
        if(!register){
            res.status(400).json({loginError:"It looks like you don't have an account !"});
        }
        else{
            bcrypt.compare(password, register.password)
            .then((isMatched) => {
                var credential={
                    email:register.email,
                    id:register.id
                }

                
               var token=jsonwt.sign(credential, key, { expiresIn: '1h' });
               res.json({token:"bearer "+token});


                
            })
            
            .catch(err=>console.log(err));

        }
    })
    .catch(err=>console.log(err));





})






// export router to index file
module.exports=router;