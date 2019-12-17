const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
router.post('/', async (req, res) =>{


    try{
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new UserModel({
        username : req.body.username,
        password : hashedPassword,
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName
    });
    const user = await newUser.save((err,savedUser) => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        return res.status(200).send(newUser);
    });
    }catch(err){
    console.log(err);
    }

});




module.exports = router;