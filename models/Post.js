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
    campus : String, 
    reward:{
        type: Number,
        required: false,
        default: 0
    },
    dateLost:{
        type: Date,
        default: Date.now,
        required: false,
    },
    date: {
        type: Date,
        required: false,
        default: Date.now
    }
})

module.exports = mongoose.model('Posts', postSchema)