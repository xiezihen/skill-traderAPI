const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    username:{
        type: String,
        unique: true
    },
    password:{
        type: String,
    },
    firstName: String,
    lastName: String,
});


  
const User = module.exports = mongoose.model('Users', userSchema);

module.exports.getUserById = (id, callback) =>{
    User.findById(id, callback);
};
module.exports.getUserByUsername = (username, callback) => {
    User.findOne({username: username}, callback)
};

module.exports.comparePassword = (candidatePassword , hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err)
            throw err;
        callback(null, isMatch);
    });
};