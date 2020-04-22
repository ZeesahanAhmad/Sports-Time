// import require module
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyparser=require('body-parser');

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
//ruter is imported fron auth.js
const auth=require('./Router/api/auth');

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



 app.listen(port);