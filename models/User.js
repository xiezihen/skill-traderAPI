const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type: String,
        unique: true
    },
    password:{
        type: String,
    },
    firstName: String,
    lastName: String
});

module.exports = mongoose.model('Users', userSchema);