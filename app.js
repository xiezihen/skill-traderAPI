const express = require('express');
const app = express();
const postsRoute = require('./routes/posts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/posts', postsRoute);

app.get('/', (req, res) => {
    res.send("home");
});

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true }, 
     ()=>{
    console.log("connected")
})



app.listen(3000);