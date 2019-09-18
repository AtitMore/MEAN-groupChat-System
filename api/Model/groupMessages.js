let mongoose = require('mongoose').connection
let Schema = require('mongoose').Schema

let groupMessagesSchema = new Schema({
    username:  String,
    messages: String,
}, {
    strict: false
});

const groupMessagesModel = mongoose.model('groupMessages', groupMessagesSchema, 'groupMessages')
module.exports = groupMessagesModel;