const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    campus : String 
})

module.exports = mongoose.model('Posts', postSchema)