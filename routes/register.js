const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');


router.post('/', async (req, res) =>{

const newUser = new UserModel({
    username : req.body.username,
    password : req.body.password,
    firstName : req.body.firstName,
    lastName : req.body.lastName
});
try{

const user = await newUser.save((err,savedUser) => {
    if(err){
        console.log(err);
        return res.status(500).send();
    }
    return res.status(200).send();
});
}catch(err){
console.log(err);
}

});




module.exports = router;