const mongoose = require('mongoose');

const Actor = mongoose.model('Actor', {
    name: String,
    age: Number
});

module.exports = { Actor };