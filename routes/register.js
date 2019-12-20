const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

router.post('/', [
    //validators
    check('username').isLength({min:4, max:20}).
    matches(/^[a-zA-Z0-9_.-]*$/).withMessage("must only contain letters"),

    check('password').isLength({min:8, max:20}).
    matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]*$/).
    withMessage("must contain at least a number, " +
     "uppercase and lowercase letter without any other types of characters"),

    check('email').normalizeEmail().isEmail().withMessage("not a valid email")
],
async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return res.send({message: "invalid submission", errors: errors})
    }
    try{
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

router.get('/exists/:username', async (req, res) => {
    try{
        user = await UserModel.findOne({username: req.params.username})
        if (user){
            return res.send({doesExist: true})
        }
        return res.send({doesExist:false})
    }catch(err){
        return res.send({doesExist:false})
        console.log(err);
    }
})




module.exports = router;