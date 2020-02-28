const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.put('/mySkills', passport.authenticate('jwt',{session:false}), (req, res) =>{
    let userId = req.body.userId
    User.findByIdAndUpdate(userId, {mySkills: req.body.mySkills },{new: true}, (err, user) => {
        if (err){
            res.status(404).send()
        }else{
            res.status(200).send()
        }
    });
})
router.put('/about', passport.authenticate('jwt',{session:false}), (req, res) => {
    let userId = req.body.userId
    User.findByIdAndUpdate(userId, {about: req.body.about },{new: true}, (err, user) => {
        if (err){
            res.status(404).send()
        }else{
            res.status(200).send()
        }
    });
})
router.put('/basicinfo', passport.authenticate('jwt',{session:false}) ,(req,res) => {
    
})

module.exports = router;