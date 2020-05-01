// import require module
const express=require('express');
const app=express();
const passport=require('passport');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const path=require('path');

app.use(passport.initialize());
// importing and calling jwt strategy
require('./Strategies/JWTstrategy')(passport);

app.use('/',express.static(path.join(__dirname,"public")))

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
//router is imported from Auth.js
const auth=require('./Router/api/Auth');
//router is imporant from Profile.js
const profile=require('./Router/api/Profile');

//create connection with mongodb
const db=require('./variable/url').mongoURL;
mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log("mongoDB connected successfully"))
.catch(err=>console.log(err));

var port=3000||process.env.PORT;



//middleware to use router from index.js
app.use('/api/auth',auth);
app.use('/api',profile);



 app.listen(port);