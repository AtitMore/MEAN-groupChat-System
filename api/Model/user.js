let mongoose = require('mongoose').connection
let Schema = require('mongoose').Schema

let userSchema = new Schema({
    "username" : String,
    "user_level" : String,
    "image" : String,
}, {
    strict: false
});

const userModel = mongoose.model('users', userSchema, 'users')
module.exports = userModel;