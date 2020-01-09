
const express = require('express');
const app = express();
const postsRoute = require('./routes/posts');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const initializePassport = require('./passport-config');
require('dotenv/config');



// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));
//middleware
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
require('./passport-config')(passport);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


//routes
app.use('/posts', postsRoute);
app.use('/login',loginRoute);
app.use('/register',registerRoute);

app.get('/', (req, res) => {
    res.send("home");
});

//db connection
mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }, 
     ()=>{
    console.log("connected")
})

app.listen(process.env.PORT || 3000);