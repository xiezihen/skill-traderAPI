const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        index: {
            unique: true,
            collation: { locale: 'en', strength: 2 }
        }
    },
    displayname: String,
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },

    firstName: {
        type: String,
        default: "",
        required: false
    },
    lastName: {
        type: String,
        default: "",
        required: false
    },
    city: String,
    about: String
        
});


  
const User = module.exports = mongoose.model('Users', userSchema);

module.exports.getUserById = (id, callback) =>{
    User.findById(id, callback);
};
module.exports.getUserByUsername = (username, callback) => {
    User.findOne({username: new RegExp(username, 'i')}, callback)
};

module.exports.comparePassword = (candidatePassword , hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err)
            throw err;
        callback(null, isMatch);
    });
};