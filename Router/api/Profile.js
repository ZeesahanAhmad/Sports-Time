const express=require('express');
const router=express.Router();
const passport=require('passport');
const mongoose=require('mongoose');

const UpdatePlayerProfile=require('../../Modal/UpdatePlayerProfile');

//@router:api/profile
//@method:get
//@desc:route for going into player profile
//@access:private

//after redirection from login page this route will run

router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res)=>{
     // display basic profileinfo
     res.json(req.user);
     // some feature under profile
     
     // 1.Update profile
     // 2.Delete profile
     // 3.Search match
     // 4.Add match

});

//@router:api/player/profile/update
//@method:post
//@desc:route for player profile update
//@access:private

router.post('/player/profile/update',passport.authenticate('jwt',{session:false}),(req,res)=>{
     // collect values
     const PlayerProfile={};
     PlayerProfile.user=req.user.id;
     if(req.body.username)
     PlayerProfile.username=req.body.username;
     if(req.body.profilepic)
     PlayerProfile.profilepic=req.body.profilepic;
     if(req.body.introduction)
     PlayerProfile.introduction=req.body.introduction;

     // database stuff
     UpdatePlayerProfile.findOne({user:req.user.id})
     .then(playerProfile=>{
          // if found update the profile
          if(playerProfile){
               playerProfile.findOneAndUpdate({user:req.user.id},{$set:PlayerProfile},{new:true})
               .then(playerProfile=>{
                    res.json(playerProfile);

                })
               .catch(err=>console.log("error in update :"+err));

          }
          // if not found register the profile
          else{
               new UpdatePlayerProfile(playerProfile).save()
               .then(playerProfile=>{
                    res.json(playerProfile);
               })
               .catch(err=>console.log("error in saving profile update :"+err));

          }





     })
     .catch((err)=>console.log("error in getting profile:"+err));





});


module.exports=router;

