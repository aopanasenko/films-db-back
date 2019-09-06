const mongoose = require('mongoose');

const Actor = mongoose.model('Actor', {
    name: String,
    age: Number,
    oscars: Number
});

module.exports = { Actor };