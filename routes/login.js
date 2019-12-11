const express = require('express');
const router = express.Router();
const PostModel = require('../models/User');

router.post('/', async (req,res) => {

    const loginUser = new PostModel({
        
        
    });
    try{
        PostModel.findOne({username : req.body.username, password : req.body.password},
            (err, user) => {
            if (err){
                console.log(err);
                return res.status(500).send();
            }if (!user){
                console.log("incorrect");
                return res.status(404).send();
            }
            console.log("user:"+ req.body.username +" is now logged in");
            return res.status(200).send();
        });
        
        
    }catch(err){
        console.log(err);
        res.status(500).send();
    }
})



module.exports = router;

