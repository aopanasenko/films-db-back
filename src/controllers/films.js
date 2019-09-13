const { Router } = require('express');
const { Film } = require('../models/films');

const filmsRouter = Router();

// GET /films/
filmsRouter.get('/', async function (req, res) {
    let films = await Film.find();
        
    await Film.getOneWithActors(films);

    res.send(films);
});

// GET /films/:id
filmsRouter.get('/:id', async function (req, res) {
    try {
        const film = await Film.findById(req.params.id);
        res.send(film);
    } catch (err) {
        console.log(err);
    }
});

// POST /film/update
filmsRouter.post('/update', async (req, res) => {
    try {
        const newFilm = req.body;

        await Film.findByIdAndUpdate(newFilm._id, newFilm, {useFindAndModify: false});

        res.send('Film updated');
    } catch (err) {
        console.log(err);
    }
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