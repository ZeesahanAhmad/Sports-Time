const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// import secretkey from variable folder
const key=require('../variable/Url').secreteKey;
const Register=require('../Modal/Register');

//code for passport jwt strategy
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

module.exports=(passport)=>{
    passport.use(new JwtStrategy(opts,(jwt_payload, done)=>{
        Register.findOne({email:jwt_payload.email})
        .then((register)=>{
            if(register){
                return done(null, user);
            }
                return done(null, false);
            })
        .catch((err)=>console.log(err))
    }));



}
