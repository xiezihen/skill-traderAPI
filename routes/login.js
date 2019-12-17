const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport')
const jwt = require('jsonwebtoken')
require('dotenv/config');

router.post('/', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password){
        return res.send({message:"invalid json format"})
    }
    User.getUserByUsername(username, (err, user) =>{
        if (err)throw err;
        if(!user){
            return res.send({success : false, message:"This username does not exist"})
        }User.comparePassword(password, user.password, (err, isMatch)=>{
            if(err) throw err;
            if(isMatch){
                    const token = jwt.sign(user.toJSON(), process.env.SECRET,{
                    expiresIn : 6500
                });
        
                res.json({
                    success : true,
                    token : token,
                    user:{
                        id: user._id,
                        username : user.username,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName

                    }

                });

            } else {
                return res.json({message: "Incorrect password"})
            }
        })
        
    })       
})





module.exports = router;

