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
    skill : String, 
    category:{
        type: String,
        required: true,
        enum: ['Technology', 'Art', 'Outdoors', 'Sports', 'Crafts', 'Games', 'Fitness','Other']
    },

    date: {
        type: Date,
        required: false,
    }
})

module.exports = mongoose.model('Posts', postSchema)