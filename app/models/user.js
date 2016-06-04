var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    facebook: {
        id: String,
        token: String,
        email: String,
        fullName: String,
        firstName: String,
        avatar: String
    }
});

module.exports = mongoose.model('User', userSchema);