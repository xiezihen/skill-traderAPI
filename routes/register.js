const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
router.post('/', async (req, res) =>{


    try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);
    const newUser = new UserModel({
        username : req.body.username,
        password : hashedPassword,
        firstName : req.body.firstName,
        lastName : req.body.lastName
    });
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