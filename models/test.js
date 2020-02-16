const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const test = mongoose.model('test', testSchema);
module.exports = test;