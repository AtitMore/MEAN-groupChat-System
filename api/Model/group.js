let mongoose = require('mongoose').connection
let Schema = require('mongoose').Schema

let groupSchema = new Schema({
    group_name:  String,
    created_by: String,
    users: [ 
        {
            id : { type: Schema.Types.ObjectId, ref: 'users' },
            username : String,
            status : String,
            user_level : String
        }, 
    ],
}, {
    strict: false
});

const groupModel = mongoose.model('group', groupSchema, 'group')
module.exports = groupModel;