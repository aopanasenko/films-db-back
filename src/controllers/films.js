const { Router } = require('express');
const { Film } = require('../models/films');
const axios = require('axios').default;

const filmsRouter = Router();

// GET /films/
filmsRouter.get('/', async function (req, result) {
        let films = await Film.find();
        
        films = await Promise.all(films.map(async (film) => {
            actors = film.actors.map(async actorId => {
                const actorResponse = await axios.get(`http://localhost:3000/actors/${actorId}`);
                const actor = actorResponse.data;
                return actor;
            });

            actors = await Promise.all(actors);
            film.actors = actors;
            return film;
        }));

        result.send(films);
});

// POST /films/create
filmsRouter.post('/create', function (req, res) {
    const { name, year, actors } = req.body;

    const film = new Film({
        name,
        year,
        actors
    });

    film.save(function (err, film) {
        if (err) throw new Error(err);

        res.send('Film created');
    });
});

module.exports = { filmsRouter };