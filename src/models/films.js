const { Actor } = require('../models/actors');
const mongoose = require('mongoose');
const axios = require('axios').default;

const Schema = mongoose.Schema;

const filmsSchema = new Schema({
    name: { 
        type: String, 
        required: true,
        validate: {
            validator: function(name) {
                return (name.trim() == "");
            }
        } 
    },
    year: {
        type: Number,
        required: true,
        validate: {
            validator: function(year) {
                return !isNaN(year);
            }
        }
    },
    actors: { 
        type: Array,
        required: true,
        validate: {
            validator: function(actors) {
                return actors.length;
            }
        } 
    }
});

filmsSchema.static('getOneWithActors', async (films) => {
    films = await Promise.all(films.map(async (film) => {
        actors = film.actors.map(async actorId => {
            if (mongoose.Types.ObjectId.isValid(actorId)) {
                const actorResponse = await axios.get(`http://localhost:3000/actors/${actorId}`);
                const actor = actorResponse.data;
                return actor;
            }
        });

        actors = await Promise.all(actors);
        film.actors = actors;
        return film;
    }));
});

const Film = mongoose.model('Film', filmsSchema);

module.exports = { Film };
