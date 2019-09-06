const { Actor } = require('../models/actors');
const mongoose = require('mongoose');

const Film = mongoose.model('Film', {
    name: String,
    year: Number,
    actors: Array,
});

module.exports = { Film };
