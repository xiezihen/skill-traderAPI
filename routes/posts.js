const express = require('express');
const router = express.Router();
const PostModel = require('../models/Post');




router.get('/', async (req, res) => {
    console.log("request made");
    try{
        const posts = await PostModel.find();
        res.send(posts);
    }catch(err){
        console.log(err);
    }
});

router.get('/user/:userId' , async (req, res) => {
    try{
        const posts = await PostModel.find({userId: req.params.userId});
        res.send(posts);
    }catch(err){
        console.log(err);
    }

});

router.get('/campus/:camp', async (req, res) => {
    try{
        const posts = await PostModel.find({campus:req.params.camp});
        res.send(posts);
    }catch(err){
        console.log(err);
    }

})

router.post('/', async (req,res) => {
    const post = new PostModel({
        userId: req.body.userId,
        description: req.body.description,
        campus: req.body.campus,
        reward: req.body.reward,
    });
    try{
    const posted = await post.save();
    res.json(posted);
    }catch(err){
        res.json({message: err})
    }
});

module.exports = router;