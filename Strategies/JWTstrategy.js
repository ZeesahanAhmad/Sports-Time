const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// import secretkey from variable folder
const key=require('../variable/Url').secreteKey;
const PlayerRegister=require('../Modal/PlayerRegister');

//code for passport jwt strategy
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

module.exports=(passport)=>{
    passport.use(new JwtStrategy(opts,(jwt_payload, done)=>{
        PlayerRegister.findOne({email:jwt_payload.email})
        .then((register)=>{
            if(register){
                return done(null, register);
            }else{
                return done(null, false);
            }
                
            })
        .catch((err)=>console.log(err))
    }));



}
