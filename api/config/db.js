const mongodb = require("mongodb");
const mongoose = require("mongoose");

const MONGO_HOSNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'group_chat';

const connectionString = `mongodb://${MONGO_HOSNAME}:${MONGO_PORT}/${MONGO_DB}`;
console.log(connectionString);
mongoose.connect(connectionString, {useNewUrlParser: true})
.then(() => {
    console.log('Connected to Database');
})
.catch(() => {
    console.log('Did not connected To Database');
})