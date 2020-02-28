
const express = require('express');
const app = express();
const cors = require('cors');
const postsRoute = require('./routes/posts');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const profileRoute = require('./routes/profile');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const initializePassport = require('./passport-config');
const helmet = require('helmet')
require('dotenv/config');



// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));
//middleware
app.use(helmet())
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
require('./passport-config')(passport);
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use('/*', function (req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
  }, function (req, res, next) {
    console.log('Request Type:', req.method)
    next()
  });
//routes
app.use('/posts', postsRoute);
app.use('/login',loginRoute);
app.use('/register',registerRoute);
app.use('/profile',profileRoute);

app.get('/', (req, res) => {
    res.send("api for <a>https://skilltrader.herokuapp.com/</a>");
});

//db connection
mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true,
    useUnifiedTopology: true }, 
     ()=>{
    console.log("connected")
})
mongoose.set('useFindAndModify', false);
app.listen(process.env.PORT || 3000);