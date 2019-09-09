const { Router } = require('express');
const { Film } = require('../models/films');

const filmsRouter = Router();

// GET /films/
filmsRouter.get('/', async function (req, res) {
        let films = await Film.find();
        
        await Film.getOneWithActors(films);

        res.send(films);
});

// POST /films/create
filmsRouter.post('/create', (req, res) => {
    const { name, year, actors } = req.body;

    let film = new Film({
        name,
        year,
        actors
    });

    film.save((err, film) => {
        if (err) res.json(err);

        res.send('Film created');
    });
});

module.exports = { filmsRouter };